const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./utils/db");
const userRouter = require("./api/user/user.routes");
const ticketRouter = require("./api/ticket/ticket.routes");

const {
  notFoundHandler,
  errorHandler,
} = require("./api/middleware/error.middleware");

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectMongo();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is up");
});
app.use("/user", userRouter);
app.use("/ticket", ticketRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
