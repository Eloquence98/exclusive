const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const routes = require("./routes");
const errorHandler = require("./middleware/error");
const config = require("./config/config");
const logger = require("./utils/logger");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Routes
app.use("/api/v1", routes);

// Error Handler
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(
    `Server running in ${config.nodeEnv} mode on port ${config.port}`
  );
});
