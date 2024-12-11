import { Prisma, PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

const categoryValidation = Joi.object({
  name: Joi.string().required().min(3).max(50),
  tasks: Joi.array(),
});
export const createCategory = async (data) => {
  const { name, tasks } = data;

  const { error } = categoryValidation.validate(data);

  if (error) {
    return error.message;
  }

  const result = await prisma.category.create({
    data: {
      name: name,
      tasks: tasks,
    },
  });

  console.log(result, "service data");

  return result;
};

export const getCategory = async () => {
  const data = await prisma.category.findMany({});
  return data;
};

export const deleteCategory = async (id) => {
  const task = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!task) {
    console.log("error");
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
  const { error } = categoryValidation.validate(data);

  if (error) {
    return error.message;
  }

  const { name } = data;

  // Update category with the provided id and new data
  const updateCategory = await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
    },
  });

  return updateCategory; // Return the updated category object
};

export const getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });
};
