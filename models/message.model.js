const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat-users",
      required: true,
    },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat-users",
      required: true,
    },
    messageContent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const msgModel = mongoose.model("Chat-messages", msgSchema);

module.exports = msgModel;
