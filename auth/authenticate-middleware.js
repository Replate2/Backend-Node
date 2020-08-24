const jwt = require("jsonwebtoken");
const secret = require("../constants/secret");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({
          message: "Bad credentials!",
        });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No auth token found!" });
  }
};
