const mongoose = require("mongoose");
const userModel = require("../models/authMode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/jwt.token");

exports.register = async (req, res) => {
  const { name, email, password, gender } = req.body;

  try {
    // CHECK IS USER ALREADY EXIST OR NOT
    const isExist = await userModel.find({ email });

    if (isExist.length) {
      res.json({
        success: false,
        message: "email already exist.",
      });
    } else {
      // PROVIDE THE PHOTO URL BASED ON THEIR GENDER
      let photo = `https://avatar.iran.liara.run/username?username=${name}`;

      if (gender.toLowerCase() == "male") {
        photo = `https://avatar.iran.liara.run/public/boy?username=${name}`;
      } else {
        photo =
          photo = `https://avatar.iran.liara.run/public/girl?username=${name}`;
      }

      // HASHING PROCESS OF PASSWORD
      bcrypt.hash(password, 10, async (err, hashed) => {
        if (err) {
          res.json({
            success: false,
            message: "something went wrong. Please try again later.",
          });
        } else {
          const data = new userModel({
            name,
            email,
            password: hashed,
            photo,
            gender,
          });
          await data.save();

          res.json({
            success: true,
            message: "account created successfully.",
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error occured in register controller.",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // LOGIN EMAIL CHECK
  const isUser = await userModel.findOne({ email });

  try {
    if (isUser) {
      // CHECK PASSWORD

      bcrypt.compare(password, isUser.password, (err, result) => {
        if (err) {
          res.json({
            success: false,
            message: "something went wrong. Please try again later.",
          });
        }

        if (result) {
          // GENERATE TOKEN AND RESPONSE IT THROUGH COOKIE
          const token = generateToken(isUser._id, res);
          res.json({
            success: true,
            message: "Login successfull.",
            data: {
              id: isUser._id,
              name: isUser.name,
              email: isUser.email,
              photo: isUser.photo,
            },
            token,
          });
        } else {
          res.json({
            success: false,
            message: "Invaid Email or Password.",
          });
        }
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Email or Password.",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "try catch error occured in login controller.",
    });
  }
};

exports.logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
