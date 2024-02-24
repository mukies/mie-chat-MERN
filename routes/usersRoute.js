const express = require("express");
const { tokenVerify } = require("../middlewares/tokenVerify");
const authModel = require("../models/authMode");
const router = express.Router();

router.get("/all", tokenVerify, async (req, res) => {
  const loggedUsers = req.user._id;

  try {
    // GET ALL USERS EXCEPT CURRENTY LOGGED IN USER

    const users = await authModel
      .find({
        _id: { $ne: loggedUsers },
      })
      .select("-password");

    res.json({
      success: true,
      data: users,
      message: "successfully get all the logged in users",
    });
  } catch (error) {
    console.log("error while getting all users ", error);
    res.json({
      success: false,
      message: "something went wrong on usersRoute.",
    });
  }
});

router.get("/search/:key", async (req, res) => {
  const { key } = req.params;
  console.log("cookie", req.cookies.jwt);

  const data = await authModel
    .find({
      $or: [{ name: { $regex: key } }],
    })
    .select("-password");

  res.json({
    success: true,
    data,
  });
});

module.exports = router;
