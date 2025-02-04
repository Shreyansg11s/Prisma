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
  // console.log(data);

  try {
    const category = await createCategory(data);

    res.send({ statusCode: 201, status: status[201], data: category });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    const data = await getCategory(Number(limit), Number(offset));
    res.send({ statusCode: 200, status: status[200], data: data });
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
    res.send({ statusCode: 200, status: status[200], data: result });
  } catch (error) {
    next(error);
  }
};

export const updateCategories = async (req, res, next) => {
  try {
    //check if id exists if not throw error
    const result = await updateCategory(req.params.id, req.body);
    res.json({ statusCode: 201, status: status[201], data: result });
  } catch (error) {
    next(error);
  }
};

export const showCategory = async (req, res, next) => {
  try {
    //validation for id
    const result = await getCategoryById(req.params.id);
    if (result == null) {
      res.json({
        statusCode: 404,
        status: status[404],
        message: "Data not found",
      });
      return;
    }
    res.json({ statusCode: 200, status: status[200], data: result });
  } catch (error) {
    next(error);
  }
};
