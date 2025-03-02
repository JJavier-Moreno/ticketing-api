import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db.js";
import userRouter from "./routes/userRoutess.js";

const app = express();

app.use(express.json());

dotenv.config();

connectDB();

app.use(morgan("dev"));
app.use("/api/user", userRouter);

export default app;
