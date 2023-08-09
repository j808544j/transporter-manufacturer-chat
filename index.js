const express = require("express");
const app = express();
const logger = require("./utils/logger");
const dotenv = require("dotenv");
const startServer = require("./config/database");
const createErrorMiddleware = require("./middleware/error");

const environment = process.env.NODE_ENV || "development";
const errorMiddleware = createErrorMiddleware(logger);
dotenv.config({ path: `.env.${environment}` });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

startServer(app);
app.use(errorMiddleware);
