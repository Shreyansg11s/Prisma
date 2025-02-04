import express from "express";
import {
  deleteCategories,
  getCategories,
  showCategory,
  postCategories,
  updateCategories,
} from "../Controller/categoriesController.js";
import { body, param } from "express-validator"; // Import param for ID validation
import { validate } from "../Service/validationMW.js";

export const categoriesRouter = express.Router();

// Validation chain for the body (name field)
const validationChain = () => {
  return [body("name").trim().notEmpty().withMessage("Name is required")];
};

// Validation chain for the ID parameter
const getById = () => {
  return [param("id").trim().notEmpty().withMessage("ID is required")];
};

categoriesRouter
  .get("/get", getCategories)
  .post("/create", validate(validationChain()), postCategories)
  .delete("/delete/:id", validate(getById()), deleteCategories)
  .get("/get/:id", validate(getById()), showCategory)
  .patch(
    "/update/:id",
    validate(getById(), validationChain()),
    updateCategories
  );

export default categoriesRouter;
