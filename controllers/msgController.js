const msgModel = require("../models/message.model");
const conversationModel = require("../models/conversation.model");
const { getSocket, io } = require("../socket/socket.io");

exports.send = async (req, res) => {
  const receiverID = req.params.id;
  const senderID = req.user._id;
  const messageContent = req.body.message;

  try {
    // CHECK IF CONVERSATION ALREADY EXIST OR NOT
    let conversation = await conversationModel.findOne({
      users: {
        $all: [receiverID, senderID],
      },
    });

    // IF NOT CREATE ONE
    if (!conversation) {
      conversation = new conversationModel({
        users: [receiverID, senderID],
      });
    }

    // CREATE MESSAGE CONTENT
    const message = new msgModel({
      senderID,
      receiverID,
      messageContent,
    });

    // PUSH THE MESSAGE IN THE CONVERSATION
    conversation.messages.push(message._id);

    await conversation.save();
    await message.save();

    // SOCKET IO FUNCTIONALITY

    const socketID = getSocket(receiverID);

    if (socketID) {
      io.to(socketID).emit("newMessage", message);
    }

    res.json({
      success: true,
      message: "message send successfully.",
      conversation: message,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "something went wrong while sending a message.",
    });
  }
};

exports.getMessages = async (req, res) => {
  const { id: receiverID } = req.params;
  const senderID = req.user._id;

  try {
    // FIND THE CONVERSATION
    const conversation = await conversationModel
      .findOne({
        users: {
          $all: [senderID, receiverID],
        },
      })
      .populate("messages");

    if (!conversation) {
      return res.json({
        success: false,
        message: "conversation not found.",
      });
    } else {
      res.json({
        success: true,
        message: "conversation found.",
        conversation: conversation.messages,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "try catch error on getmessages controller",
      error,
    });
  }
};
