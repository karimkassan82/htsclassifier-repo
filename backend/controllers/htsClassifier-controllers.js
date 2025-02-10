const HtsClassifier = require("../models/htsClassifier");
const HttpError = require("../models/http-error");

const findHeadingIdOfTheSearch = async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return next(new HttpError("Search query is required", 400));
  }

  try {
    // ✅ Step 1: Perform word-by-word search in the description field
    const phraseSearch = {
      description: { $regex: `^${query}$`, $options: "i" },
    };
    const searchWords = query
      .split(/\s+/)
      .map((word) => word.trim())
      .filter(Boolean);
    const wordSearch = searchWords.map((word) => ({
      description: { $regex: word, $options: "i" },
    }));

    // ✅ Step 2: Get unique headingId values from descriptions that match
    const headingIds = await HtsClassifier.aggregate([
      { $match: { $or: [phraseSearch, ...wordSearch] } }, // Find matches
      { $group: { _id: "$headingId" } }, // Extract unique headingId values
    ]);

    const uniqueHeadingIds = headingIds.map((item) => item._id);

    // ✅ Step 3: Find all records that match any of the headingIds AND indent = 0
    let results = await HtsClassifier.find({
      headingId: { $in: uniqueHeadingIds },
      indent: "0", // 🔥 Filter to only indent = 0
    }).select("htsNo indent description headingId uniqueIndex");

    // 🚨 Fallback: If no headingId matches, return only Step 1 results, but filter indent = 0
    if (results.length === 0) {
      results = await HtsClassifier.find({
        $or: [phraseSearch, ...wordSearch],
        indent: "0", // 🔥 Ensure fallback results also have indent = 0
      }).select("htsNo indent description headingId uniqueIndex");
    }

    res.json(results);
  } catch (error) {
    console.error("Error during search:", error);
    return next(
      new HttpError("An error occurred while performing the search", 500)
    );
  }
};

// *************************************************************** //

const getTheNextIndent = async (req, res, next) => {
  try {
    const { uniqueIndex, dynamicIndent } = req.body;

    // Validate required parameters
    if (!uniqueIndex || dynamicIndent === undefined) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Fetch all data, sorted by uniqueIndex for proper row order
    const sortedData = await HtsClassifier.find()
      .sort({ uniqueIndex: 1 })
      .lean();

    // Find the first index where uniqueIndex > given uniqueIndex
    const startIndex = sortedData.findIndex(
      (row) => row.uniqueIndex > uniqueIndex
    );

    // If no valid starting index is found, return an empty array
    if (startIndex === -1) {
      return res.json([]);
    }

    // Collect matching results based on dynamicIndent logic
    const resultArray = [];
    for (let i = startIndex; i < sortedData.length; i++) {
      const row = sortedData[i];

      if (row.indent === dynamicIndent) {
        // Proper number comparison
        resultArray.push(row);
      } else if (row.indent > dynamicIndent) {
        continue; // Ignore higher indents
      } else {
        break; // Stop when encountering a lower indent
      }
    }

    return res.json(resultArray);
  } catch (error) {
    console.error("Error in getTheNextIndent:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTheNextIndent = getTheNextIndent;
exports.findHeadingIdOfTheSearch = findHeadingIdOfTheSearch;
