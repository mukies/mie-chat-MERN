const jwt = require("jsonwebtoken");

const generateToken = (uid, res) => {
  const token = jwt.sign({ uid }, process.env.SECRET_KEY, { expiresIn: "15d" });
  return token;
  // res.cookie("jwt", token, {
  //   maxAge: 15 * 24 * 60 * 60 * 1000, //15 days in milisecond
  //   // httpOnly: true, //to prevent xss cross site attack
  //   // sameSite: "strict",
  //   // secure: true,
  // });
};

module.exports = generateToken;
