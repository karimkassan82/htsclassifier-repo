require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const htsClassifierRoutes = require("./routes/htsClassifier-routes");

const app = express(); // ✅ Now app is defined!

// ✅ Logging Middleware (Logs every incoming request)
app.use((req, res, next) => {
  console.log(`📢 Received ${req.method} request to ${req.url}`);
  next();
});

// Middleware (ORDER MATTERS)
app.use(bodyParser.json()); // Parses JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(cors()); // Enables CORS

// ✅ Debugging: Log registered API routes
console.log("📢 Registering /api/classify routes...");
const router = express.Router();
htsClassifierRoutes.stack.forEach((route) => {
  console.log(`✅ Loaded Route: /api/classify${route.route.path}`);
});

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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
