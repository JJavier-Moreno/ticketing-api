import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db.js";

const app = express();

dotenv.config();

connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req,res)=> {
    res.status(200).json({message: "hola"})
})

export default app;