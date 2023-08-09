const logger = require("../utils/logger");

const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      if (user.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Access forbidden for this role" });
      }

      next();
    } catch (error) {
      logger.error("Error checking user role:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};

module.exports = checkUserRole;
