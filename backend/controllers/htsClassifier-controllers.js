const HtsClassifier = require("../models/htsClassifier");
const HttpError = require("../models/http-error");

const findHeadingIdOfTheSearch = async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return next(new HttpError("Search query is required", 400));
  }

  try {
    // ✅ Step 1: Exact phrase match (Highest priority)
    const phraseSearch = {
      description: { $regex: `\\b${query}\\b`, $options: "i" }, // Match exact phrase boundaries
    };

    // ✅ Step 2: Loose whole query match (Medium priority)
    const searchWords = query
      .split(/\s+/)
      .map((word) => word.trim())
      .filter(Boolean);

    const looseWholeQuerySearch = {
      description: { $regex: searchWords.join(".*"), $options: "i" }, // Match all words appearing together in any order
    };

    // ✅ Step 3: Individual word search (Lowest priority)
    const wordSearch = searchWords.map((word) => ({
      description: { $regex: `\\b${word}\\b`, $options: "i" }, // Match whole words only
    }));

    // ✅ Step 4: Get unique headingId values (Prioritize by importance)
    const headingIds = await HtsClassifier.aggregate([
      { $match: { $or: [phraseSearch, looseWholeQuerySearch, ...wordSearch] } }, // Prioritized search
      { $group: { _id: "$headingId" } },
    ]);

    const uniqueHeadingIds = headingIds.map((item) => item._id);

    // ✅ Step 5: Find all records that match headingId (Prioritize indent = 0)
    let results = await HtsClassifier.find({
      headingId: { $in: uniqueHeadingIds },
      indent: "0",
    }).select("htsNo indent description headingId uniqueIndex");

    // 🚨 Fallback: If no headingId matches, return best available match (with indent = 0)
    if (results.length === 0) {
      results = await HtsClassifier.find({
        $or: [phraseSearch, looseWholeQuerySearch, ...wordSearch],
        indent: "0",
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
