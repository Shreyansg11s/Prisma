import express from "express";
import {
  categoriesController,
  getCategoriesController,
} from "../Controller/categoriesController.js";

const router = express.Router();

export const categoriesRouter = () =>{ router
  .route("/categories")
  .post(categoriesController)
  .get(getCategoriesController);}
