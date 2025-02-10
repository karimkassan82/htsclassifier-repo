// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// const HtsClassifier = require("./models/htsClassifier");
const htsClassifierRoutes = require("./routes/htsClassifier-routes");

const app = express();

// Middleware (ORDER MATTERS)
app.use(bodyParser.json()); // Parses JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(cors()); // Enables CORS

// Routes
app.use("/api/classify", htsClassifierRoutes);

// Global Error Handler (MUST BE LAST)
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.code || 500;
  const message = error.message || "Something went wrong!";
  res.status(status).json({ error: message });
});

// // Connect to MongoDB
// mongoose
//   .connect(
//     `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@deploymentcluster.7abdx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=DeploymentCluster`
//   )
//   .then(() => {
//     console.log("✅ Connected to MongoDB");
//     app.listen(5000, () => console.log("🚀 Server running on port 5000"));
//   })
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));




// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7abdx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
