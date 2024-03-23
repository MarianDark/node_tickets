const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { setError } = require("../../utils/error");

const register = async (req, res, next) => {
  try {
    const user = new User(req.body);

    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      return next(setError("404", "This email has already been used."));
    }
    const userDB = await user.save();
    return res.status(201).json({
      status: 201,
      message: `User ${userDB.email} created`,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ name: req.body.name });
    console.log(bcrypt.compareSync(req.body.password, userInfo.password));
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = "*************"; // ocultamos el dato password en la respuesta por seguridad
      const token = jwt.sign(
        {
          id: userInfo._id,
          name: userInfo.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        data: { massage: "ok", user: userInfo, token: token },
      });
    } else {
      return res.json({
        status: 400,
        message: HTTPSTATUSCODE[400],
        data: null,
      });
    }
  } catch (error) {
    return next(error);
  }
};

const logout = (req, res, next) => {
  try {
    const token = null;
    return res.status(200).json({
      status: 200,
      message: "Logout successful",
    });
  } catch (error) {
    return next(setError(error.statusCode, "Logout Error"));
  }
};

module.exports = { register, login, logout };
