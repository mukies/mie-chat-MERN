const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://miechat.netlify.app"],
    methods: ["GET", "POST"],
  },
});

const getSocket = (receiverID) => {
  return users[receiverID];
};

const users = {};

io.on("connection", (socket) => {
  console.log("a new user is connected: ", socket.id);

  const userID = socket.handshake.query.userID;

  if (userID) {
    users[userID] = socket.id;
  }

  io.emit("onlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("a user is disconnected: ", socket.id);

    delete users[userID];
    io.emit("onlineUsers", Object.keys(users));
  });
});

module.exports = { app, server, getSocket, io };
