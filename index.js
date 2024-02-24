const express = require("express");

const cors = require("cors");
const authRouter = require("./routes/authRoute");
const msgRouter = require("./routes/messageRoute");
const usersRouter = require("./routes/usersRoute");
const cookie = require("cookie-parser");
const { app, server } = require("./socket/socket.io");
require("dotenv").config();

// DATABASE CONNECTION
require("./config");

// MIDDLEWARES
app.use(cookie());
app.use(cors());
app.use(express.json());

// ROUTES

app.use("/api/auth", authRouter);
app.use("/api/message", msgRouter);
app.use("/api/users", usersRouter);

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log("server started on " + port);
});
