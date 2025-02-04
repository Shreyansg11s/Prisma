// import jwt from "jsonwebtoken";
// import env from "dotenv";
// import express from "express";
// import { DateTime } from "luxon";

// export const statusRouter = express.Router();

// let jwtSecretKey = process.env.JWT_SECRET_KEY;

// statusRouter.post("/generatetoken", (req, res) => {
//   let jwtSecretKey = process.env.JWT_SECRET_KEY;
//   let data = req.body;

//   const token = jwt.sign(data, jwtSecretKey);

//   // res.send(token);
// });

// statusRouter.post("/login", (req, res) => {
//   try {
//     console.log(req.body);
//     const { username, password } = req.body;

//     if (username === "admin" && password === "admin") {
//       const token = jwt.sign(username + password + "hash", jwtSecretKey);

//       //token expiry time

//       //   console.log(req.session.cookie);
//       res.cookie("sessionId", req.sessionID);
//       res.cookie("accessToken", token);
//       req.session.user = username;

//       req.session.cookie.expires = new Date("May 19, 2025 12:10:52");

//       //   console.log(req.sessionID);

//       console.log(req.session);
//       res.send(`
//         <h1>${username} is logged in</h1>
//         <p>To logout, click <a href="#" id="logoutLink">Logout</a></p>

//         <form id="logoutForm" action="/logout" method="POST" style="display: none;">
//           <input type="hidden" name="token" value="your_csrf_token">
//         </form>

//         <script>
//           document.getElementById('logoutLink').addEventListener('click', (event) => {
//             event.preventDefault(); // Prevent default link behavior

//             setTimeout(() => {
//               document.getElementById('logoutForm').submit(); // Submit form after 5 seconds
//             }, 5000); // 5-second delay
//           });
//         </script>
//       `);

//       //   res.send(`
//       //     <form id="redirectForm" action="/logout" method="POST">
//       //       <input type="hidden" name="token" value="your_csrf_token">
//       //       <button type="button" onclick="submitForm()">Logout</button>
//       //     </form>
//       //     <script>
//       //       function submitForm() {
//       //         document.getElementById('redirectForm').submit();
//       //       }
//       //     </script>
//       //   `);
//     } else {
//       res.send("Invalid credentials. Please try again.");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });
// statusRouter.get("/authenticate", (req, res, next) => {
//   let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;

//   try {
//     const token = req.header(tokenHeaderKey);

//     const verified = jwt.verify(token, jwtSecretKey);

//     if (verified) {
//       return res.send("Successfully Verified");
//     } else {
//       return res.status(401).send(error);
//     }
//   } catch (error) {
//     next(error);
//   }
// });
// statusRouter.post("/logout", (req, res, next) => {
//   req.session.destroy();
//   res
//     .clearCookie("accessToken")
//     .clearCookie("sessionId")
//     .clearCookie("connect.sid");

//   res.json("Logged out successfully");
// });
