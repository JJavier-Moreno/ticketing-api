import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, rol } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      status: "fail",
      message: "Some fields are missing",
    });
  }

  //Verificamos si el usuario existe
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      status: "fail",
      message: "User already exists",
    });
  }

  user = new User({
    name,
    email,
    password,
    rol,
  });

  try {
    await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
        rol: user.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .header("Authorization", token)
      .status(201)
      .send({
        user: {
          name: user.name,
          email: user.email,
          rol: user.rol,
        },
        token,
      });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send({
      status: "fail",
      message: "User not found",
    });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).send({
      status: "fail",
      message: "Not authorized",
    });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      rol: user.rol,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.header("Authorization", token).send({
    user: {
        name: user.name,
        email: user.email,
        rol: user.rol,
    },
    token
  })
});

export default router;
