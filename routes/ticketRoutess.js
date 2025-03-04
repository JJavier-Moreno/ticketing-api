import express from "express";
import Ticket from "../models/ticket.js";
import auth from "../middlewares/auth.js";
import admin from  "../middlewares/admin.js";
import filter from "../middlewares/filter.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

//http://localhost:300/api/tickets?page=1&pageSize=20
router.get("/", [auth, filter, pagination(Ticket)], async (req, res) => {

    res.status(200).json({
      status: "success",
      tickets: req.paginatedResults
    });
});

router.get("/:id", auth ,async (req, res) => {
  const id = req.params.id;
  
  try {
    //NO podemos utilizar findbyId ya que aqui lo que hace sería buscar por el _id que genera mongoose en la base de datos
    const ticket = await Ticket.findOne({id});

    if (!ticket) {
      return res.status(404).json({
        status: "fail",
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      status: "success",
      ticket,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      message: error.message,
    });
  }
});

router.post("/", [auth, admin], async (req, res) => {
  const { userId, title, description, priority, state } = req.body;

  const ticket = new Ticket({
    user: req.user._id,
    title,
    description,
    priority,
    state,
  });

  try {
    await ticket.save();

    res.status(201).json({
      status: "success",
      ticket,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      message: error.message,
    });
  }
});

router.put("/:id", auth, admin, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const ticket = await Ticket.findOneAndUpdate({id}, updates, {
      new: true,
    });

    if (!ticket) {
      return res.status(404).json({
        status: "fail",
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      status: "success",
      ticket,
    });

    await ticket.save();
  } catch (error) {
    res.status(500).send({
      status: "fail",
      message: error.message,
    });
  }
});

router.delete("/:id",auth, admin, async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findOneAndDelete({id});

    if (!ticket) {
      return res.status(404).json({
        status: "fail",
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      status: "success",
      ticket,
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      message: error.message,
    });
  }
});

export default router;