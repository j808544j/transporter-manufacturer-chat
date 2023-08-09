const express = require("express");
const app = express();
const logger = require("./utils/logger");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const createErrorMiddleware = require("./middleware/error");
const registrationRoute = require("./routes/registration");
const loginRoute = require("./routes/login");

const connectToDatabase = require("./config/database");
connectToDatabase;

const environment = process.env.NODE_ENV || "development";
const errorMiddleware = createErrorMiddleware(logger);
dotenv.config({ path: `.env.${environment}` });

app.use(bodyParser.json());

app.use("/", registrationRoute);
app.use("/", loginRoute);

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
