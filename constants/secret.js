module.exports =
  process.env.JWT_TOKEN_SECRET ||
  "The developer secret, probably use a different one for production";
