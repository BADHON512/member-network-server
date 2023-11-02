const  User = require ("../model/user");
const  CatchAsyncError = require ("./CatchAsyncError");
const  ErrorHandler = require ("./ErrorHandle");
const jwt = require("jsonwebtoken");

const isAuthenticate = CatchAsyncError(async (req, res, next) => {
    const {token}=req.cookies

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});

module.exports= isAuthenticate;
