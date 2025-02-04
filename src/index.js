import express from "express";
// import { prisma } from "./prisma.js"; // Import the Prisma client
import { categoriesRouter } from "./Router/categoriesRouter.js";
import { taskRouter } from "./Router/taskRouter.js";
import { Prisma } from "@prisma/client";
import session from "express-session";
import { validationResult } from "express-validator";
import userRouter from "./Router/userRouter.js";
// import userRouter from "./Router/userRouter.js";

import { PrismaClient } from "@prisma/client";
import { loginRouter } from "./Router/loginRouter.js";
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.sendStatus(401); // Unauthorizedld

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid/expired token
    req.user = user;
    next();
  });
};

const port = 5000;
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

// Example: Listen for query logs
prisma.$on("query", (event) => {
  console.log(`[QUERY]: ${event.query}`);
  console.log(`[PARAMS]: ${event.params}`);
  console.log(`[DURATION]: ${event.duration}ms`);
});

// async function main() {
//   const newUser = await prisma.user.create({
//     data: {
//       email: "alice@prisma.io",
//       age: 21,
//       join_date: new Date(),
//       phone_number: 54,
//       user_name: "hello",
//     },
//   });
//   console.log("Created new user: ", newUser);

//   const allUsers = await prisma.user.findMany({
//     include: { tasks: true },
//   });
//   console.log("All users: ");
//   console.dir(allUsers, { depth: null });
// }

// main().then(()=> console.log("server is started at0"));

/**
 *
 * array
 * [0,1,2,3]
 * ["a","b","c"]
 * [0,"a",1,"b"]
 *   ______
 *  |0 1  2|
 *  |3 4  5|
 *  --------
 *
 *
 */

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

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", loginRouter);

app.use("/users", authenticate, userRouter);

// app.use("/", statusRouter);
app.use("/categories", authenticate, categoriesRouter);
app.use("/task", authenticate, taskRouter);
app.use(/(.*)/, (req, res, next) => {
  res.json("Page not found");
  next();
});
app.use((err, req, res, next) => {
  // console.error(err.stack); // Log the error stack for debugging

  console.log(err.stack);
  // Set status code, defaulting to 500 if not provided
  const statusCode = err.statusCode || 500;

  // Respond with error details
  res.status(statusCode).json({
    success: "False",
    message: err.message || "Internal Server Error",
    statusCode,
  });
});
