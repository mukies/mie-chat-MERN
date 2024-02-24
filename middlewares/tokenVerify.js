const jwt = require("jsonwebtoken");
const userModel = require("../models/authMode");

exports.tokenVerify = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (token) {
      const decode = jwt.verify(token, process.env.SECRET_KEY);

      if (decode) {
        const user = await userModel
          .findById({ _id: decode.uid })
          .select("-password");

        req.user = user;
        next();
      } else {
        res.json({
          success: false,
          message: "Invalid Token !!",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Invalid Token !!",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "something went wrong. Please try again later.",
    });
  }
};
