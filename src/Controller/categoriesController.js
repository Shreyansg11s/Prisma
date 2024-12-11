import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  updateCategory,
} from "../Service/categoriesService.js";
import { status } from "http-status";

export const postCategories = async (req, res, next) => {
  // console.log("hereee");
  const data = req.body;

  try {
    const category = await createCategory(data);
    console.log(category, "data");

    res.send({ status: status.CREATED, data: category });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const data = await getCategory();
    res.send({ status: "OK", data: data });
  } catch (err) {
    next(err);
  }

  // next(err);
};

export const deleteCategories = async (req, res, next) => {
  try {
    const result = await deleteCategory(req.params.id);
    if (result == null) {
      res.json("No data found");
    }
    res.send({ status: "OK", data: result });
  } catch (error) {
    next(error);
  }
};

export const updateCategories = async (req, res, next) => {
  try {
    const result = await updateCategory(req.params.id, req.body);
    res.json({ status: "OK", data: result });
  } catch (error) {
    next(error);
  }
};

export const showCategory = async (req, res, next) => {
  try {
    const result = await getCategoryById(req.params.id);
    if (result == null) {
      res.json("Data not found");
      return;
    }
    res.json({ status: "OK", data: result });
  } catch (error) {
    next(error);
  }
};
