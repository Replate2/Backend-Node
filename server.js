const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const authenticate = require('../auth/auth-mw.js');
// const authRouter = require('../auth/auth-router.js');
// const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use('/api/auth', authRouter);
// server.use('/api/jokes', authenticate, jokesRouter);

server.get("/", (req, res) => {
    res.json({ api: "up" });
});

const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
