// controllers/searchController.js

const supabase = require("../config/supabase");

exports.searchSongs = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(200).json({
        success: true,
        results: []
      });
    }

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .ilike("title", `%${q}%`);

    if (error) throw error;

    res.status(200).json({
      success: true,
      results: data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};