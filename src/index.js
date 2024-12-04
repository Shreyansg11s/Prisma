import express from "express";
import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";
import { status } from "http-status";
import { categoriesRouter } from "./Router/categoriesRouter.js";
// Assuming you're using Prisma
// import categoriesRouter from "./Router/categoriesRouter.js"; // Unused in the code, so remove if not necessary

const prisma = new PrismaClient(); // Initialize Prisma client
const port = 5000;

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// POST route for creating categories
app.use("/",categoriesRouter);

app
  .get("/tasks", async (req, res) => {
    try {
      const data = await prisma.task.findMany({});

      res.status[status.classes.SUCCESSFUL].json(data);
    } catch (error) {
      res.status[status.classes.SERVER_ERROR].json(error.message);
    }
  })
  .post("/tasks", async (req, res) => {
    const {
      title,
      description,
      task_status,
      start_date,
      end_date,
      category_id,
    } = req.body;

    // Ensure the dates are in the correct format (ISO 8601 string or JavaScript Date object)
    // const startDate = new Date(start_date); // Convert the date string to a JavaScript Date object
    // const endDate = new Date(end_date);
    let created_at = DateTime.now(); // Convert the date string to a JavaScript Date object

    try {
      // Create the task
      const taskCreated = await prisma.task.create({
        data: {
          title: title,
          description: description,
          task_status: task_status, // Assuming task_status is a string and you map it to your Status model
          start_date: new Date(start_date), // Use the JavaScript Date object
          end_date: new Date(end_date), // Use the JavaScript Date object
          category_id: category_id, // Assuming category_id is a valid foreign key
          created_at: created_at, // Automatically set created_at to the current date and time
          // Automatically set updated_at to the current date and time
        },
      });

      // Respond with the created task
      res.status[status.classes.SUCCESSFUL].send({
        status: "OK",
        data: taskCreated,
      });
    } catch (error) {
      console.error(error);
      res.status[status.classes.SERVER_ERROR].send({ error: error.message });
    }
  });

// // Use the categoriesRouter (if it's needed)
// app.use("/categories", categoriesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
