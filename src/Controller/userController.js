import status from "http-status";
import { prisma } from "../prisma.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  updateUser,
} from "../Service/userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const postUserController = async (req, res, next) => {
  const data = req.body;

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    }); // Replace with the unique field, e.g., `email`
    if (existingUser) {
      return res
        .status(409)
        .json({ statusCode: 409, error: "Email already exists" });
    }
    const existingUser2 = await prisma.user.findUnique({
      where: { username: data.username },
    }); // Replace with the unique field `username`
    if (existingUser2) {
      return res
        .status(409)
        .json({ statusCode: 409, error: "Username already exists" });
    }

    // Create the user
    const result = await createUser(data);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
export const updateUserController = async (req, res, next) => {
  let data = req.body;

  const id = parseInt(req.params.id);
  // data.u\\
  try {
    // Fetch the current user data
    const currentUser = await prisma.user.findUnique({
      where: { user_id: id },
    });

    if (!currentUser) {
      return res.status(404).json({ statusCode: 404, error: "User not found" });
    }

    // Check if the email is being changed and validate its uniqueness
    if (data.email && data.email !== currentUser.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existingUser) {
        return res
          .status(409)
          .json({ statusCode: 409, error: "Email already exists" });
      }
    }

    // Check if the username is being changed and validate its uniqueness
    if (data.username && data.username !== currentUser.username) {
      const existingUser2 = await prisma.user.findUnique({
        where: { username: data.username },
      });
      if (existingUser2) {
        return res
          .status(409)
          .json({ statusCode: 409, error: "Username already exists" });
      }
    }

    // Update the user
    const result = await updateUser(data, id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await getUserById(id);
    res.send({ status: status[200], statusCode: 200, data: result });
  } catch (error) {
    throw error;
  }
};

export const getUserController = async (req, res, next) => {
  const limit = req.params.limit;
  const offset = req.params.offset;
  try {
    const result = await getUser(limit, offset);
    res.send({ data: result, status: status[200], statusCode: 200 });
  } catch (error) {
    throw error;
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    const check = getUserById(req.params.id);
    if (check) {
      const result = await deleteUser(req.params.id);
      res.send({ data: result, status: status[200], statusCode: 200 });
    } else {
      res.json({
        statusCode: 404,
        status: status[404],
        message: "No data found",
      });
    }
  } catch (error) {
    throw error;
  }
};
