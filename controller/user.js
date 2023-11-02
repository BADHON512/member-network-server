const express = require("express");
const ErrorHandler = require("../Middleware/ErrorHandle");

const User = require("../model/user");
const CatchAsyncError = require("../Middleware/CatchAsyncError");
const SendToken = require("../Utils/SendToken");
const isAuthenticate = require("../Middleware/auth");
const cloudinary = require("cloudinary");
const { upload } = require("../multer");

const router = express.Router();

router.post(
  "/user-post",
  CatchAsyncError(async (req, res, next) => {
    try {
      const { name, email, password, avatar } = req.body;
      const result=await cloudinary.v2.uploader.upload(avatar,{
        folder:"avatar"
      })
      const user = await User.create({
         name, 
         email, 
         password ,
         image:{
           public_id:result.public_id,
           url:result.secure_url
         }
        });


      res.status(200).json({
        success: true,
        user,
        message: "register successful",
      });
    } catch (error) {
      if (error.code === 11000) {
        return next(new ErrorHandler("same name again", 400));
      }
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.post(
  "/user-login",
  CatchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User doesn't not exist", 400));
      }

      const isPass = await user.comparePassword(password);
      if (!isPass) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      SendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get(
  "/get-user",
  isAuthenticate,
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get(
  "/get-all-users",
  isAuthenticate,
  CatchAsyncError(async (req, res, next) => {
    try {
      const users = await User.find();
      if (!users) {
        return next(new ErrorHandler("No users found", 400));
      }

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.post(
  "/role-update",
  CatchAsyncError(async (req, res, next) => {
    try {
      const { email, role } = req.body;

      // Find the user by email and update their role to "admin"
      const user = await User.findOneAndUpdate({ email }, { role: role });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, user ,message:"role updated" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get(
  "/log-out",
  CatchAsyncError(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
        });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
