const ErrorHandler = require("../Middleware/ErrorHandle");

const CustomError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";
  console.log(err);

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resources not found with this id ..^${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // Duplicate key error

  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyPattern)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = CustomError;
