const express = require("express");
const app = express();
const logger = require("./utils/logger");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const createErrorMiddleware = require("./middleware/error");
const registrationRoute = require("./routes/registration");
const loginRoute = require("./routes/login");
const createOrder = require("./routes/createOrder");
const message = require("./routes/message");
const chatHistory = require("./routes/chatHistory");
const connectToDatabase = require("./config/database");

const environment = process.env.NODE_ENV || "development";
const errorMiddleware = createErrorMiddleware(logger);
dotenv.config({ path: `.env.${environment}` });

app.use(bodyParser.json());

app.use("/", registrationRoute);
app.use("/", loginRoute);
app.use("/", createOrder);
app.use("/", message);
app.use("/", chatHistory);

connectToDatabase()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    logger.error("Exiting application due to error.", e);
    process.exit(1);
  });
app.use(errorMiddleware);
