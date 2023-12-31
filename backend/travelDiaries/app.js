import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routing/Blog-routes.js";
import userRouter from "./routing/User-routes.js"; // Correct the path here
import cors from "cors"
const app = express();
dotenv.config();

// Add this middleware to parse JSON in the request body
app.use(cors());
app.use(express.json());

// Rest of your code...

mongoose
  .connect("mongodb+srv://admin:X2IsnfJ6UhxVa5N2@cluster0.mpp4dfz.mongodb.net/?retryWrites=true&w=majority")
  .then(() => app.listen(5000, () => console.log("connection successful")))
  .catch((err) => console.log(err));

// User routes
app.use("/user", userRouter);

// Blog routes
app.use("/blogs", blogRouter);

// Default route
app.use("/", (req, res, next) => {
  res.send("hai");
});
