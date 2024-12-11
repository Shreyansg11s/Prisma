import status from "http-status";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskById,
  updateTask,
} from "../Service/taskService.js";
import { prisma } from "../prisma.js";

export const postTaskController = async (req, res, next) => {
  // console.log("hereee");
  const data = req.body;
  try {
    const category = await createTask(data);

    res.send({ status: status.CREATED, data: category });
  } catch (error) {
    res.send(error.message);
  }
};

export const getTaskController = async (req, res, next) => {
  try {
    const data = await getTask();

    res.send({ status: "OK", data: data });
  } catch (error) {
    res.status(500);
  }
};

export const deleteTaskController = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await deleteTask(Number(id));

    res.json({
      success: true,
      message: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskByIdController = async (req, res, next) => {
  console.log("here");
  try {
    const result = await getTaskById(req.params.id);
    if (result == null) {
      res.json("No data found");
      return;
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export const updateTaskByIdController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const result = await updateTask(id, data);
    console.log("here1");

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res) => {
  console.log("here");
  const taskId = parseInt(req.params.id);
  const { task_status } = req.body;

  // Validate the provided status
  if (
    !task_status ||
    !["pending", "in-progress", "completed"].includes(task_status)
  ) {
    return res.status(400).json({
      message:
        "Invalid status. Valid statuses are: pending, in-progress, completed.",
    });
  }

  try {
    // Find the task by ID
    const task = await prisma.task.findUnique({
      where: { task_id: taskId },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    // Update the task's status, keeping other fields unchanged
    const updatedTask = await prisma.task.update({
      where: { task_id: taskId },
      data: {
        task_status: task_status, // Only update the status
      },
    });

    return res.status(200).json({
      message: "Task status updated successfully.",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
