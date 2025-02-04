import { Prisma, PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

const categoryValidation = Joi.object({
  name: Joi.string().required().min(3).max(50),
  // tasks: Joi.array(),
});
export const createCategory = async (data) => {
  const { name, tasks } = data;

  const { error } = categoryValidation.validate(data);
  // console.log(name, tasks);

  if (error) {
    return error.message;
  }

  const result = await prisma.category.create({
    data: {
      name: name,
      // tasks: tasks,
    },
  });

  return result;
};

export const getCategory = async (limit, offset) => {
  let take = limit || 10;
  let skip = offset || 0;
  const data = await prisma.category.findMany({
    take: take,
    skip: skip,
  });

  const total = await prisma.category.count();

  const pages = Math.ceil(total / take);
  let currentpage = Math.floor(skip / take + 1);
  let returned = { total, pages, currentpage, data };
  return returned;
};

export const deleteCategory = async (id) => {
  const task = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!task) {
    console.log("error"); // throw error with status code and message and handle response in global error handler
    return;
  }

  const result = await prisma.category.delete({
    where: {
      id: Number(id),
    },
  });
  return result;
};

export const updateCategory = async (id, data) => {
  // Validate the input data
  let id1 = parseInt(id);
  // Check if the category exists
  const check = await prisma.category.findUnique({
    where: {
      id: id1,
    },
  });

  if (!check) {
    throw new Error("Category not found.");
  }

  // Update the category
  const updatedCategory = await prisma.category.update({
    where: {
      id: id1,
    },
    data: {
      name: data.name,
    },
  });

  return updatedCategory;
};
export const getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });
};
