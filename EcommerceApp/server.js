import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";

// configur env

dotenv.config();

// database config

connectDB();

// create rest object

const app = express();

// middleware

app.use(express.json());
app.use(morgan("dev"));

// routes

app.use("/api/v1/auth", authRoute);

// rest api's

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

// Port

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${PORT}....`.bgCyan
      .white
  );
});
