const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connectToDatabase;
