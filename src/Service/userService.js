import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";

export const getUser = async (limit, offset) => {
  let take = limit || 10;
  let skip = offset || 0;
  const result = await prisma.user.findMany({
    take: take,
    skip: skip,
  });
  let data = { result, take, skip };
  return data;
};

export const createUser = async (data) => {
  // return

  const { username, email, age, phone_number, password } = data;

  const salt = await bcrypt.genSalt(10);

  const h_password = await bcrypt.hash(password, salt);

  const result = await prisma.user.create({
    data: {
      username: username,
      email: email,
      age: age,
      phone_number: phone_number,
      password: h_password,
    },
  });
  return result;
};

export const updateUser = async (data, id) => {
  const { username, email, age, phone_number } = data;
  try {
    const find = await prisma.user.findUnique({
      where: {
        user_id: id,
      },
    });
  } catch (error) {
    throw error;
  }
  try {
    const result = await prisma.user.update({
      where: {
        user_id: id,
      },
      data: {
        username: username,
        email: email,

        age: age,
        phone_number: phone_number,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  let idreq = parseInt(id);
  try {
    const find = await prisma.user.findUnique({
      where: {
        user_id: idreq,
      },
    });
    return find;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  let uid = parseInt(id);
  try {
    const find = await prisma.user.findUnique({
      where: {
        user_id: uid,
      },
    });
    if (find) {
      const result = await prisma.user.delete({
        where: {
          user_id: uid,
        },
      });
      return result;
    } else {
      throw "No data found";
    }
  } catch (error) {
    throw error;
  }
};
