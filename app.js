import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db.js";
import userRouter from "./routes/userRoutess.js";
import ticketRouter from "./routes/ticketRoutess.js";
import error from "./middlewares/error.js";

const app = express();

app.use(express.json());

dotenv.config();

connectDB();

app.use(morgan("dev"));
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);
app.use(error); //Lo ponemos el último para que se ejecute después de todas las rutas

export default app;
