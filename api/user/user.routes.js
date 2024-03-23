const express = require("express");
const userRouter = express.Router();
const { register, login, logout } = require("./user.controller");
const { isAuth } = require("../middleware/auth.middleware");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", [isAuth], logout);

module.exports = userRouter;
