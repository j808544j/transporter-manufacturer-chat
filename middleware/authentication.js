const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Token verification failed:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = isAuthenticated;
