import express from "express";
import { loginController } from "../Controller/loginController.js";

export const loginRouter = express.Router();

loginRouter
  .post("/login", loginController)

  .post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  });
