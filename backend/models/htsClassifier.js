const mongoose = require("mongoose");

const htsClassifierSchema = new mongoose.Schema({
  htsNo: { type: String },
  indent: { type: Number },
  description: { type: String },
  headingId: { type: String },
  uniqueIndex: { type: Number },
});

// Export the Model
const HtsClassifier = mongoose.model("HtsClassifier", htsClassifierSchema);
module.exports = HtsClassifier;
