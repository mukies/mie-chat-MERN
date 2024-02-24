const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    photo: { type: String, default: "" },
    // FOR PROFILE PIC WE'LL USE 'https://avatar-placeholder.iran.liara.run/'
  },
  { timestamps: true }
);

const authModel = mongoose.model("Chat-users", authSchema);

module.exports = authModel;
