const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat-users",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat-messages",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const conversationModel = mongoose.model(
  "Chat-conversations",
  conversationSchema
);

module.exports = conversationModel;
