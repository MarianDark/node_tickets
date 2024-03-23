const express = require("express");
const ticketRouter = express.Router();
const { isAuth } = require("../middleware/auth.middleware");
const {
  createTicket,
  getAllTickets,
  getTicketByCode,
  redeemTicket,
} = require("./ticker.controller");

ticketRouter.post("/", [isAuth], createTicket);
ticketRouter.get("/", [isAuth], getAllTickets);
ticketRouter.get("/:code", [isAuth], getTicketByCode);
ticketRouter.patch("/:code", [isAuth], redeemTicket);

module.exports = ticketRouter;
