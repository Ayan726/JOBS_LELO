const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (req, res, next) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ error: true, message: "content not found!!" });
};

module.exports = notFoundMiddleware;
