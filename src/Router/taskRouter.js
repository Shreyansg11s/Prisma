import express from "express";
import { body, param } from "express-validator";
import {
  deleteTaskController,
  getTaskByCategory,
  getTaskByIdController,
  getTaskByUserController,
  getTaskController,
  postTaskController,
  updateStatus,
  updateTaskByIdController,
} from "../Controller/taskController.js";

import { prisma } from "../prisma.js";
import { validate } from "../Service/validationMW.js";

export const taskRouter = express.Router();

// Validation chain for task creation
const createTaskValidation = () => {
  return [
    body("task_status")
      .isIn(["pending", "approved", "ongoing"])
      .withMessage("Valid options are pending approved and on-going"),
    body("title").trim().notEmpty().withMessage("Title is required"),

    body("description").optional().trim(),

    body("start_date")
      .isISO8601()
      .withMessage("Start_date must be a valid date")
      .custom((start_date, { req }) => {
        const end_date = req.body.end_date;
        if (
          start_date &&
          end_date &&
          new Date(start_date) > new Date(end_date)
        ) {
          throw new Error("Start_date must be before End_date");
        } else {
          return true;
        }
        throw new Error("Please enter both start and end date");
      }),

    body("end_date")
      .optional()
      .isISO8601()
      .withMessage("End_date must be a valid date"),
  ];
};

// Validation chain for task update
const updateTaskValidation = () => {
  return [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Title cannot be empty"),
    body("category_id").notEmpty().withMessage("ID cannot be empty"),
    body("description").optional().trim(),
    body("end_date").isISO8601(),
    body("start_date")
      .isISO8601()
      .custom((start_date, { req }) => {
        const end_date = req.body.end_date;
        if (
          start_date &&
          end_date &&
          new Date(start_date) > new Date(end_date)
        ) {
          throw new Error("End_date must be after Start_date");
        } else {
          return true;
        }
      }),
  ];
};

// const dateTime = (id, end_date) => {
//   return [
//     async (value) => {
//       const date = await prisma.task.findUnique({
//         where: {
//           task_id: id,
//         },
//         select: {
//           start_date: true,
//         },
//       });
//       console.log(date);
//       if (end_date < date) {
//         return false;
//       } else {
//         return true;
//       }
//     },
//   ];
// };

// Validation chain for task status update
const updateStatusValidation = () => {
  return [
    body("task_status")
      .trim()
      .notEmpty()
      .withMessage("Status is required")
      .isIn(["pending", "in-progress", "completed"])
      .withMessage("Status must be one of: pending, in-progress, completed"),
  ];
};

// Validation chain for the ID parameter
const validateId = () => {
  return [param("id").notEmpty().withMessage("ID is required")];
};

// Routes with validation
taskRouter
  .get("/getbyuser/:id", getTaskByUserController)
  .get("/getbycategory/:id", getTaskByCategory)
  .get("/get", getTaskController)
  .post("/create", validate(createTaskValidation()), postTaskController)
  .delete("/delete/:id", validate(validateId()), deleteTaskController)
  .get("/get/:id", validate(validateId()), getTaskByIdController)
  .put(
    "/update/:id",
    validate(updateTaskValidation()),
    updateTaskByIdController
  )
  .put(
    "/task_status/:id",
    // [...validateId(), ...updateStatusValidation()],
    updateStatus
  );

export default taskRouter;
