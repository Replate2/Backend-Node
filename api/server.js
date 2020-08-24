const express = require("express");
const server = express();

const helmet = require("helmet");
const protected = require("../auth/authenticate-middleware");

const authRouter = require("../auth/auth-router");
const userRouter = require("../users/users-router");

server.use(express.json());
server.use(helmet());

server.use("/auth", authRouter);
server.use("/users", protected, userRouter);

server.get("/", (req, res) => res.send("Hello there!"));

module.exports = server;
