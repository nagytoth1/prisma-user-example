import express from "express";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // hash password
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  // if a user exists in a table with these credentials (username + hashedPassword)
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
        password: hashedPassword,
      },
    });

    if (user) {
      res.status(200).json({ message: "Login successful", token: "alma" });
    } else {
      res
        .status(401)
        .json({ message: "Unauthenticated: Invalid username or password" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
