import createCategory, { getCategory } from "../Service/categoriesService.js";
import { status } from "http-status";

export const categoriesController = (req, res, next) => {
  console.log("hereee");
  data = req.body;
  try {
    const categoriesCreated = createCategory(data);
    res.send({ status: "OK", data: categoriesCreated });
  } catch (error) {
    res.send(error.message);
  }
};

export const getCategoriesController = async (req, res, next) => {
  try {
    const data = getCategory;

    res.status[status.classes.SUCCESSFUL].json(data);
  } catch (error) {
    res.status[status.classes.SERVER_ERROR].json(error.message);
  }
};
