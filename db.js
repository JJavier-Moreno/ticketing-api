import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URL_TEST
    : process.env.MONGO_URL || "mongodb://localhost:27017/ticketing-db";

const connectDB = async() => {
  console.log(DB_URL);
  try {
    await mongoose
      .connect(DB_URL)
      .then(() => {
        console.log(`Conectado a la base de datos ${DB_URL}`);
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
