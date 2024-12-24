import { DateTime } from "luxon";
import { prisma } from "../prisma.js";
import Joi from "joi";

const taskValidation = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string(),
  task_status: Joi.string().valid("in-progress", "pending", "completed"),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  category_id: Joi.number(),
});
export const createTask = async (data) => {
  const { title, description, task_status, start_date, end_date, category_id } =
    data;

  let createdAt = DateTime.now();
  const { error } = taskValidation.validate(data);

  // If validation fails, return a 400 status with error details
  if (error) {
    return error.message;
  }

  const result = await prisma.task.create({
    data: {
      title: title,
      description: description,
      task_status: task_status,
      start_date: new DateTime(start_date),
      end_date: new DateTime(end_date),
      category_id: category_id,
      created_at: createdAt,
    },
  });
  return result;
};

export const getTask = async (limit, offset) => {
  const data = await prisma.task.findMany({
    take: limit,
    skip: offset,
  });

  const total = await prisma.task.count();

  const pages = Math.ceil(total / limit);
  let currentpage = math.floor(offset / limit + 1);
  let returned = { total, pages, currentpage, data };
  return returned;
};

export const deleteTask = async (id) => {
  await prisma.task.findUnique({
    where: {
      task_id: id,
    },
  });

  const result = await prisma.task.delete({
    where: {
      task_id: id,
    },
  });
  return result;
};

export const updateTask = async (id, data) => {
  const { error } = taskValidation.validate(data);

  if (error) {
    return error.message;
  }

  const updated_at = DateTime.now();
  console.log(updated_at);
  const { title, description, task_status, start_date, end_date, category_id } =
    data;
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
  // Select title, description, task_status from task
  return task;
};

export const getTaskById = async (id) => {
  return await prisma.task.findUnique({
    where: {
      task_id: Number(id),
    },
  });
};
