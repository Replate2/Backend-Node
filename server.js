const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/user-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get("/", (req, res) => {
    res.json({ api: "up" });
});

const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
