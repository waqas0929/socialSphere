import errorHandler from "../utils/errorHandler.js";

const search = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return errorHandler(res, "Query parameter is required");
    }

    const results = await performSearch(query);

    res.json({ results });
  } catch (error) {
    console.error("Error performing search", error);
    errorHandler(res, "INTERNAL_SERVER_ERROR");
  }
};

export default search;
