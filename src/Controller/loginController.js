import status from "http-status";
import { prisma } from "../prisma.js";
import { Login } from "../Service/loginService.js";
import jwt from "jsonwebtoken";

export const loginController = async (req, res, next) => {
  const data = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const object = {
    name: data.username,
    phone_number: data.phone_number,
    id: data.user_id,
  };

  const authenticate = req.body;

  try {
    const loginResult = await Login(authenticate);

    if (loginResult) {
      const token = jwt.sign(object, process.env.JWT_SECRET_KEY);
      res
        .cookie("token", token)
        .send({ token: token, status: status[200], statusCode: 200 });
    } else {
      res.send({ message: "Login failed" });
    }
  } catch (error) {
    throw error;
  }
};
