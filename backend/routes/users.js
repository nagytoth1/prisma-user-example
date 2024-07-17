import express from "express";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { validateRequest } from "./auth.js";

const prisma = new PrismaClient();
const router = express.Router();

/**
 * This endpoint fetches a single user or a list of users. (READ)
 * If the query parameter "id" is set, then the filter is defined by userID.
 * If the query parameter "email" is set, then the filter is defined by the user's email address.
 * If none defined, then there is no filter, all of the users can be retrieved.
 */
router.get("/filter", validateRequest, async (req, res) => {
  const userID = req.query.id;
  const userEmail = req.query.email;
  let filter;
  if (userID) {
    // if "id" defined
    filter = {
      where: { id: Number(userID) },
    };
  } else if (userEmail) {
    // if "email" query parameter defined
    filter = {
      where: { email: userEmail },
    };
  } else {
    // if none of these are defined
    try {
      const foundUser = await prisma.user.findMany();
      res.status(200).json(foundUser);
    } catch (error) {
      res.status(500).json({ message: error });
    } finally {
      return;
    }
  }
  try {
    const foundUser = await prisma.user.findFirst(filter);
    if (foundUser === null) {
      res.status(400).json({ message: "User does not exist in the table" });
      return;
    }
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

/**
 * This endpoint creates a new user record in the database. (CREATE)
 */
router.post("/", async (req, res) => {
  console.debug(req.body);
  const { name, email, password } = req.body;
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  try {
    const createdUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(200).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

/**
 * This endpoint updates an existing user record in the database. (UPDATE)
 */
router.put("/:id", async (req, res) => {
  const { name, email } = req.body;
  const userID = req.params.id;
  try {
    const foundUser = await prisma.user.findFirst({
      where: { id: parseInt(userID) },
    });
    const updatedUser = await prisma.user.update({
      data: { name: name || foundUser.name, email: email || foundUser.email },
      where: { id: parseInt(userID) },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

/**
 * This endpoint removes an existing user record from the database. (DELETE)
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
