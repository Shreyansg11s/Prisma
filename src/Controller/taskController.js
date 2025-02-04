import status from "http-status";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskByCategories,
  getTaskById,
  getTaskByUser,
  updateTaskModified,
} from "../Service/taskService.js";
import { prisma } from "../prisma.js";
import { body, check } from "express-validator";

export const postTaskController = async (req, res, next) => {
  // console.log("hereee");
  const data = req.body;
  try {
    let checkCategory = await prisma.category.findUnique({
      where: { id: req.body.category_id },
    });
    console.log(checkCategory);
    let checkUser = await prisma.user.findUnique({
      where: { user_id: req.body.user_id },
    });
    if (!checkUser) {
      res.json({
        status: status[400],
        statusCode: 400,
        message:
          "Foreign key error: following user id does not exist in user table",
      });
    }
    if (!checkCategory) {
      res.json({
        status: status[400],
        statusCode: 400,
        message:
          "Foreign key error: following category id does not exist in category table",
      });
    }
    if (data.end_date < data.start_date) {
      return res.json({
        status: status[400],
        statusCode: 400,
        message: "End date should not be greater than start date.",
      });
    }
    // console.log(data);

    const task = await createTask(data);

    res.send({ statusCode: 201, status: status[201], data: task });
  } catch (error) {
    res.send(error.message);
  }
};
export const getTaskByCategory = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { limit, offset } = req.query;
    const data = await getTaskByCategories(Number(limit), Number(offset), id);
    if (data.length < 1) {
      res.send({
        statusCode: 404,
        status: status[404],
      });
    }
    res.send({
      statusCode: 200,
      status: status[200],
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskByUserController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { limit, offset } = req.query;

    const data = await getTaskByUser(Number(limit), Number(offset), id);

    if (data.length < 1) {
      res.send({
        statusCode: 404,
        status: status[404],
      });
    }

    res.send({
      statusCode: 200,
      status: status[200],
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskController = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;

    const data = await getTask(Number(limit), Number(offset));

    res.send({
      statusCode: 200,
      status: status[200],
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTaskController = async (req, res, next) => {
  try {
    const id = req.params.id;

    const get = await getTaskById(id);

    if (get) {
      const result = await deleteTask(Number(id));
      res.json({
        statusCode: 200,
        status: status[200],
        data: result,
      });
    } else {
      res.json({
        statusCode: 404,
        status: status[404],
        message: "No data found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getTaskByIdController = async (req, res, next) => {
  try {
    const result = await getTaskById(req.params.id);

    if (!result) {
      res.json({
        statusCode: 404,
        status: status[404],
        message: "No data found",
      });
      return;
    }
    res.json({ statusCode: 200, status: status[200], data: result });
  } catch (error) {
    next(error);
  }
};

export const updateTaskByIdController = async (req, res, next) => {
  console.log("controller");
  try {
    const id = req.params.id;

    const data = req.body;
    if (data.end_date < data.start_date) {
      return res.json({
        status: status[400],
        statusCode: 400,
        message: "End date should not be greater than start date.",
      });
    }

    const result = await updateTaskModified(id, data);

    if (!result || result === false) {
      // res.json({message: ""})
      // throw new Error("Task not found!");
      // res.status(200).send("Something broke!");
      // function logErrors (err, req, res, next) {
      //   console.error(err.stack)
      //   next(err)
      // }
    }

    res.json({ statusCode: 200, status: status[200], data: result });
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res) => {
  console.log("here");
  const taskId = parseInt(req.params.id);
  const { task_status } = req.body;

  // Validate the provided status
  // if (
  //   !task_status ||
  //   !["pending", "in-progress", "completed"].includes(task_status)
  // ) {
  //   return res.json({
  //     statusCode: 400,
  //     status: status[400],
  //     message:
  //       "Invalid status. Valid statuses are: pending, in-progress, completed.",
  //   });
  // }

  try {
    // Find the task by ID
    const task = await prisma.task.findUnique({
      where: { task_id: taskId },
    });

    if (!task) {
      return res.json({ status: status[404], message: "Task not found." });
    }

    // Update the task's status, keeping other fields unchanged
    const updatedTask = await prisma.task.update({
      where: { task_id: taskId },
      data: {
        task_status: task_status, // Only update the status
      },
    });

    return res.json({
      statusCode: 200,
      status: status[200],
      data: updatedTask,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      statusCode: 500,
      status: status[500],
      message: "Internal Server Error",
    });
  }
};
