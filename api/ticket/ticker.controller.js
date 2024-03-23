const Ticket = require("./ticket.model");

const createTicket = async (req, res, next) => {
  try {
    const ticket = new Ticket(req.body);
    ticket.save();
    res.status(200).json({
      status: 200,
      message: "created",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json({
      status: 200,
      message: "ok",
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
};

const getTicketByCode = async (req, res, next) => {
  try {
    const ticket = await Ticket.findOne({ code: req.params.code });
    if (ticket && !ticket.redeemed) {
      res.status(200).json({
        status: 200,
        message: "ok",
        data: ticket,
      });
    } else if (ticket && ticket.redeemed) {
      res.status(200).json({
        status: 200,
        message: "ATENCIÓN: Este ticket ya ha sido canjeado.",
        data: ticket,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "No se ha encontrado ningun ticket con ese código",
      });
    }
  } catch (error) {
    next(error);
  }
};

const redeemTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findOne({ code: req.params.code });
    console.log(ticket.redeemed, ticket._id);

    if (ticket._id && !ticket.redeemed) {
      const newTicket = await Ticket.findByIdAndUpdate(
        ticket._id,
        { redeemed: true },
        { new: true }
      );
      if (newTicket) {
        res.status(200).json({
          status: 200,
          message: "ok",
          data: newTicket,
        });
      }
    } else if (ticket && ticket.redeemed) {
      res.status(200).json({
        status: 200,
        message: "ATENCIÓN: Este ticket ya ha sido canjeado.",
        data: ticket,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "No se ha encontrado ningun ticket con ese código",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketByCode,
  redeemTicket,
};
