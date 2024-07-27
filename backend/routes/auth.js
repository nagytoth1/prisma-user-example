import express, { json } from "express";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();
const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "";
const DEFAULT_USER = process.env.DEFAULT_USER || "root";
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || "root";

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username === DEFAULT_USER && password === DEFAULT_PASSWORD) {
    console.debug("using default user to add more users");
    let generatedToken;
    try {
      generatedToken = jsonwebtoken.sign(username, JWT_SECRET);
    } catch (error) {
      console.debug(error.message);
      return;
    }
    res.cookie("auth_token", generatedToken);
    res.status(200).json({
      message: "Login successful",
      user: {
        name: "Default User",
        email: "test@test.com",
      },
    });
    return;
  }
  // hash password
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  // if a user exists in a table with these credentials (username + hashedPassword)
  try {
    const foundUser = await getUserFromDatabase(username, hashedPassword);

    if (!foundUser) {
      res
        .status(401)
        .json({ message: "Not authenticated: Invalid username or password" });
      return;
    }
    // if the user exists in the database with given input credentials
    const generatedToken = jsonwebtoken.sign(username, JWT_SECRET);
    // let the user attach the token to every request to make sure every endpoint is called from a logged in user
    res.cookie("token", generatedToken);
    res.status(200).json({
      message: "Login successful",
      user: {
        email: "abc123@test.com",
        description: "more info about the user...",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getUserFromDatabase = async (name, password = undefined) => {
  try {
    let filter = {
      name: name,
    };
    // if the password is set, the filter is extended to password as well
    if (password) {
      filter = { ...filter, password: password };
    }
    const foundUser = await prisma.user.findUnique({
      where: filter,
    });
    return foundUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function validateRequest(req, res, next) {
  // fetch token from request cookie
  const { token } = req.cookies;
  if (!token) return res.sendStatus(401); // Unauthorized if no token is present
  // token from the client, ACCESS_TOKEN from the server, and check for the payload (username) identifying a user
  jsonwebtoken.verify(token, JWT_SECRET, async (error, name) => {
    if (error) {
      res.sendStatus(403);
      return;
    }
    try {
      const foundUser = await getUserFromDatabase(name);
      if (!foundUser)
        return res.status(403).send("User does not exist in the database");
      req.user = foundUser;
      next();
    } catch (error) {
      next(error);
    }
  });
}

export default router;
