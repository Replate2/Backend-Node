const express = require("express");
const server = express();

const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const userRouter = require("../users/users-router");
const locationsRouter = require("../locations/locations-router");
const LeftoversRouter = require("../leftovers/leftovers-router");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/auth", authRouter);
server.use("/users", userRouter);
server.use("/locations", locationsRouter);
server.use("/leftovers", LeftoversRouter);

server.get("/", (req, res) => res.send("Hello there!"));

module.exports = server;
