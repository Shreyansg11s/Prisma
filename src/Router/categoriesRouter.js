import express from "express";
import {
  deleteCategories,
  getCategories,
  showCategory,
  postCategories,
  updateCategories,
} from "../Controller/categoriesController.js";

export const categoriesRouter = express.Router();

categoriesRouter
  .get("/categories", getCategories)
  .post("/categories", postCategories)
  .delete("/categories/:id", deleteCategories)
  .get("/categories/:id", showCategory)
  .patch("/categories/:id", updateCategories);
