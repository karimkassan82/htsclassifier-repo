const HtsClassifier = require("../models/htsClassifier");
const HttpError = require("../models/http-error");

const findHeadingIdOfTheSearch = async (req, res, next) => {
  const { query } = req.query; // Get the search phrase from query parameters

  if (!query) {
    return next(new HttpError("Search query is required", 400)); // Use HttpError with status code 400
  }

  try {
    // Step 1: Build search criteria based on the exact phrase first
    const phraseSearch = {
      description: { $regex: `^${query}$`, $options: "i" },
    }; // Match exact phrase

    // Step 2: Split the query into individual words for more flexible search
    const searchWords = query
      .split(/\s+/)
      .map((word) => word.trim())
      .filter(Boolean);
    const wordSearch = searchWords.map((word) => ({
      description: { $regex: word, $options: "i" }, // Match each word individually in the description field
    }));

    // Step 3: Perform aggregation to get unique 'headingId' values based on the description search
    const headingIds = await HtsClassifier.aggregate([
      { $match: { $or: [phraseSearch, ...wordSearch] } }, // Match the phrase or individual words
      { $group: { _id: "$headingId" } }, // Group by 'headingId' to get unique values
    ]);

    // Extract all unique 'headingId' values
    const uniqueHeadingIds = headingIds.map((item) => item._id);

    // Step 4: Perform a search based on exact matches of headingId and related data
    const results = await HtsClassifier.find({
      headingId: { $in: uniqueHeadingIds }, // Match only the exact 'headingId' values
      $or: wordSearch, // Include the description search as well
    }).select("htsNo indent description headingId uniqueIndex");

    // Step 5: Filter results where 'htsNo' is exactly 4 characters
    const filteredResults = results.filter((item) => item.htsNo.length === 4);

    // If no results found, return an empty array
    if (filteredResults.length === 0) {
      return res.json([]);
    }

    // Return the matching results
    res.json(filteredResults);
  } catch (error) {
    console.error("Error during search:", error);
    return next(
      new HttpError("An error occurred while performing the search", 500)
    ); // Internal server error
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
