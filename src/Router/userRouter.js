import { body, param } from "express-validator";
import {
  deleteUserController,
  getUserByIdController,
  getUserController,
  postUserController,
  updateUserController,
} from "../Controller/userController.js";
import express from "express";
import { validate } from "../Service/validationMW.js";
import { prisma } from "../prisma.js";

const userRouter = express.Router();

userRouter
  .get("/get", getUserController)

  .post(
    "/create",
    validate([
      body("phone_number").isLength({ min: 10, max: 10 }),
      body("email")
        .isEmail()
        .withMessage("Please provide a valid email address."),
      // .custom(async (email) => {
      //   const existingUser = await prisma.user.findUnique({
      //     where: { email: email },
      //   });
      //   if (existingUser) {
      //     throw new Error(
      //       "Email already exists. Please use a different one."
      //     );
      //   }
      // }),

      body("password")
        .isLength({ min: 5 })
        .withMessage("Password must be at least 5 characters long."),

      body("username")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long."),
      // .custom(async (username) => {
      //   const existingUser = await prisma.user.findUnique({
      //     where: { username: username },
      //   });
      //   if (existingUser) {
      //     throw new Error(
      //       "Username already exists. Please choose a different one."
      //     );
      //   }
      // }),
    ]),
    postUserController
  )

  .delete("/delete/:id", deleteUserController)
  .get("/get/:id", getUserByIdController)
  .put(
    "/update/:id",
    validate([
      body("phone_number").isLength({ min: 10, max: 10 }),
      body("email")
        .isEmail()
        .withMessage("Please provide a valid email address."),
      // .custom(async (email) => {
      //   const userId = parseInt(10);
      //   const existingUser = await prisma.user.findUnique({
      //     where: { email: email, NOT: { user_id: userId } },
      //   });
      //   if (existingUser) {
      //     throw new Error(
      //       "Email already exists. Please use a different one."
      //     );
      //   }
      // })
      body("username")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long."),
      // .custom(async (username) => {
      //   const userId = parseInt(10);
      //   const existingUser = await prisma.user.findUnique({
      //     where: { username: username, NOT: { user_id: userId } },
      //   });
      //   if (existingUser) {
      //     throw new Error(
      //       "Username already exists. Please choose a different one."
      //     );
      //   }
      // }),
    ]),
    updateUserController
  );

export default userRouter;
