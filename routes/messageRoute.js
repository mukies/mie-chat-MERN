const express = require("express");
const { send, getMessages } = require("../controllers/msgController");
const { tokenVerify } = require("../middlewares/tokenVerify");
const router = express.Router();

router.post("/send/:id", tokenVerify, send);
router.get("/:id", tokenVerify, getMessages);

module.exports = router;
