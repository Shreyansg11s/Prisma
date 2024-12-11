import express from "express";
import { prisma } from "./prisma.js"; // Import the Prisma client
import { categoriesRouter } from "./Router/categoriesRouter.js";
import { taskRouter } from "./Router/taskRouter.js";
import { Prisma } from "@prisma/client";

const port = 5000;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

prisma
  .$connect()
  .then(() => {
    console.log("Connected to the database successfully!");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if the database connection fails
  });

// app.use((err, req, res, next) => {
//   if (err.isOperational) {
//     return res.status(err.statusCode).json({
//       status: "error",
//       message: err.message,
//     });
//   }

//   // If it's a non-operational error (e.g., programming bugs), log it and send a generic response
//   console.error(err.stack);
//   res.status(500).json({
//     status: "error",
//     message: "Internal Server Error",
//   });
// });

app.use("/", categoriesRouter);
app.use("/", taskRouter);
app.use("*", (req, res, next) => {
  res.json("Page not found");
  next();
});
app.use((err, req, res, next) => {
  // console.error(err.stack); // Log the error stack for debugging

  // Set status code, defaulting to 500 if not provided
  const statusCode = err.statusCode || 500;

  // Respond with error details
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
