import { DateTime } from "luxon";
import { prisma } from "../prisma.js";
import Joi from "joi";

// const taskValidation = Joi.object({
//   title: Joi.string().min(3).max(50).required(),
//   description: Joi.string(),
//   task_status: Joi.string().valid("in-progress", "pending", "completed"),
//   start_date: Joi.date().required(),
//   end_date: Joi.date().required(),
//   category_id: Joi.number(),
// });
export const createTask = async (data) => {
  const {
    title,
    description,
    task_status,
    start_date,
    end_date,
    category_id,
    user_id,
  } = data;

  let createdAt = DateTime.now();

  const result = await prisma.task.create({
    data: {
      title: title,
      description: description,
      task_status: task_status,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      created_at: createdAt,
      User: { connect: { user_id: user_id } },
      category: {
        connect: { id: category_id },
      },
    },
  });
  return result;
};

export const getTask = async (limit, offset) => {
  let take = limit || 10;
  let skip = offset || 0;
  const data = await prisma.task.findMany({
    take: take,
    skip: skip,
  });

  const total = await prisma.task.count();

  const pages = Math.ceil(total / take);
  let currentpage = Math.floor(skip / take + 1);
  let returned = { total, pages, currentpage, data };
  return returned;
};

export const getTaskByCategories = async (limit, offset, id) => {
  let take = limit || 10;
  let skip = offset || 0;
  const data = await prisma.task.findMany({
    where: {
      category_id: id,
    },
    take: take,
    skip: skip,
  });

  return data;
};

export const getTaskByUser = async (limit, offset, id) => {
  let take = limit || 10;
  let skip = offset || 0;
  const data = await prisma.task.findMany({
    where: {
      user_id: id,
    },
    take: take,
    skip: skip,
  });
  return data;
};
export const deleteTask = async (id) => {
  let check = await prisma.task.findUnique({
    where: {
      task_id: id,
    },
  });
  if (check) {
    const result = await prisma.task.delete({
      where: {
        task_id: id,
      },
    });
    return result;
  } else {
    return "No data found to delete";
  }
};

export const updateTask = async (id, data) => {
  // const { error } = taskValidation.validate(data);

  // if (error) {
  //   return error.message;
  // }

  let check = await getTaskById(id);

  const updated_at = DateTime.now();
  // console.log(updated_at);
  const { title, description, task_status, start_date, end_date, category_id } =
    data;

  if (check) {
    const task = await prisma.task.update({
      where: {
        task_id: Number(id),
      },
      data: {
        title: title,
        description: description,
        task_status: task_status,
        start_date: new DateTime(start_date),
        end_date: new DateTime(end_date),
        category_id: category_id,
        updated_at: updated_at,
      },
    });
    return task;
  } else {
    throw "No data found to update";
  }
  // Select title, description, task_status from task
};

export const updateTaskModified = async (id, data) => {
  let check = await getTaskById(id);

  const updated_at = DateTime.now();
  const { title, description, task_status, start_date, end_date, category_id } =
    data;

  if (check) {
    const task = await prisma.task.update({
      where: {
        task_id: Number(id),
      },
      data: {
        title: title,
        description: description,
        task_status: task_status,
        start_date: new DateTime(start_date),
        end_date: new DateTime(end_date),
        category_id: category_id,
        updated_at: updated_at,
      },
    });
    return task;
  } else {
    return false;
  }
  // Select title, description, task_status from task
};

export const getTaskById = async (id) => {
  return await prisma.task.findUnique({
    where: {
      task_id: Number(id),
    },
  });
};
