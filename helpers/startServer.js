const connectToDatabase = require("../config/database");

async function startServer(app) {
  try {
    await connectToDatabase();
    app.listen(process.env.PORT, () => {
      logger.info(`Server is running on port ${process.env.PORT}`);
    });
  } catch (e) {
    logger.error("Exiting application due to error.", e);
    process.exit(1);
  }
}

module.exports = startServer;
