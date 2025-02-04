import express from "express";
import {
  body,
  matchedData,
  param,
  query,
  validationResult,
} from "express-validator";
import { ObjectId } from "mongodb";

import fs from "fs";
import { getTaskById } from "./src/Service/taskService.js";

const app = express();

const createEmailChain = () => body("email").optional().trim().isEmail();

app.use(express.json());

app.listen(4000, () => {
  console.log("server is started at 4000");
});

app.get("/", async (req, res, next) => {
  const user = await getTaskById(req.params.id);
});

app.get("/a", [
  function (req, res, next) {
    fs.writeFile("/inaccessible-path", "data", next);
  },
  function (req, res) {
    res.send("OK");
  },
]);

app.get("/hello", query("person").notEmpty(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    console.log(data);
    return res.send(`Hello, ${req.query.person}!`);
  }
  //   res.send(`Hello, ${req.query.person}!`);
  res.send({ errors: result.array() });
});

app.post("/newsletter", createEmailChain(), (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    //   const data = matchedData(req.body);
    return res.send(`Hello, ${req.body.email}!`);
    // console.log(data);
  }
  //   res.send(`Hello, ${req.query.person}!`);
  res.send({ errors: result.array() });
});

app.post(
  "/update-user",
  body("addresses.*.number").isInt(),
  body("siblings.*.name").trim().notEmpty(),
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return res.send(`${req.body.addresses}!`);
    }
    res.send({ errors: result.array() });
  }
);

app.put("/update-chart", body("**.name").notEmpty(), (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return res.send(`${req.body.teams}`);
  }
  res.send({ errors: result.array() });
});

app.post(
  "/create-user",
  body("password").isLength({ min: 5 }),
  body("passwordConfirmation").custom((value, { req }) => {
    return value === req.body.password;
  }),
  (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      return res.send(`password changed to ${req.body.password}`);
    }

    res.send({ errors: result.array() });
    // Handle request
  }
);

app.post(
  "/user/:id",
  [
    param("id")
      .custom((value) => {
        if (!ObjectId.isValid(value)) {
          console.log("error");
          throw new Error("Invalid ObjectId format");
        }
        return value;
      })
      .customSanitizer((value) => {
        return new ObjectId(value);
      }),
    //   .withMessage("Data must be a mongodb object ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.params.id); // Now contains a valid ObjectId
    res.send("User ID processed successfully");
  }
);

// app.post(
//   "/user/:id",
//   [
//     param("id")
//       .custom((value) => {
//         if (!ObjectId.isValid(value)) {
//           throw new Error("Invalid ObjectId format");
//         }
//         return value; // Return the original value if it's valid
//       })
//       .customSanitizer((value) => new ObjectId.createFromHexString(value)), // Convert to ObjectId
//   ],
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     console.log(req.params.id); // Now contains a valid ObjectId
//     res.send("User ID processed successfully");
//   }
// );
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
