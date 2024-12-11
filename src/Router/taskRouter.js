import express from "express";
import { createTask, getTask, updateTask } from "../Service/taskService.js";
import {
  deleteTaskController,
  getTaskByIdController,
  getTaskController,
  postTaskController,
  updateStatus,
  updateTaskByIdController,
} from "../Controller/taskController.js";
export const taskRouter = express.Router();

taskRouter
  .get("/tasks", getTaskController)
  .post("/tasks", postTaskController)
  .delete("/tasks/:id", deleteTaskController)
  .get("/tasks/:id", getTaskByIdController)
  .patch("/tasks/:id", updateTaskByIdController)
  .put("/tasks/:id/task_status", updateStatus);
