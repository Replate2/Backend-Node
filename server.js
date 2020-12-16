
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/user-router.js');
const donorsRouter = require('./replate2/donor-router.js');
const volunteersRouter = require('./replate2/volunteer-router.js');
const foodItemsRouter = require('./replate2/foodItem-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.options('*', cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/donors', donorsRouter);
server.use('/api/volunteers', volunteersRouter);
server.use('/api/foodItems', foodItemsRouter);

server.get("/", (req, res) => {
    res.json({ api: "up" });
});

server.all('*', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
});

module.exports = server;