const UserModel = require("../database/models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catcher = require("../utilities/catcher");

// ADDING SIGNUP FUNCTIONALITY..............................................................
module.exports.join = catcher(async (req, res, next) => {
  const { name, email, password, confirmPassword, photo } = req.body;

  //   The below check can also be done in the user Schema export section by pre function but for now we will continue here
  if (password != confirmPassword) {
    return res.status(400).json({
      status: "fail",
      message: "Password and confirm password do not match",
    });
  }

  const user = await UserModel.create({
    name,
    email,
    password,
    confirmPassword,
    photo,
  });
  res.status(201).json({
    status: "success",
    message: "User Created successfully",
    content: user,
  });
});

// ADDING LOGIN FUNCTIONALITY................................................................
module.exports.login = catcher(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    const err = new Error("email required....");
    next(err);
    return;
  }
  // return next(new _Error('Email is required to login'))
  if (!password) {
    return res
      .status(400)
      .json({ status: "fail", message: "Password is Required" });
  }

  const user = await UserModel.findOne({ email });

  //   console.log(user);

  if (!user) {
    return res.status(404).json({ status: "fail", message: "User not found " });
  }

  const isPasswordCorrect = await user.correctPassword(password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid credentials" });
  }

  const token = user.generateToken();

  

  console.log(token);
  
  res.status(200).json({
    status: "success",
    message: "User logged in Successfully!",
    content: {
      user,
      token,
    },
  });
});
