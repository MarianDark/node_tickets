const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  const secret = req.app.get("secretKey") || process.env.JWT_SECRET;

  if (!authorization) {
    return res.json({
      status: 401,
      message: "Unauthorized",
      data: null,
    });
  }

  const splits = authorization.split(" ");
  if (splits.length != 2 || splits[0] != "Bearer") {
    return res.json({
      status: 400,
      message: "Bad Request",
      data: null,
    });
  }

  const jwtString = splits[1];

  try {
    var token = jwt.verify(jwtString, secret);
  } catch (error) {
    return next(error);
  }

  const authority = {
    id: token.id,
    name: token.name,
  };
  req.authority = authority;
  next();
};

module.exports = {
  isAuth,
};
