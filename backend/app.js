// app.js

const express = require("express");
const cors = require("cors");
const searchRoutes = require("./src/routes/search");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Music Streaming API is running 🚀",
  });
});

// Songs Route Example
app.get("/api/songs", async (req, res) => {
  try {
    const supabase = require("./src/config/supabase");
    const songRoutes = require('./src/routes/song');

    const { data, error } = await supabase
      .from("songs")
      .select("*");

    if (error) throw error;

    res.status(200).json({
      success: true,
      count: data.length,
      songs: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.use("/api/search", searchRoutes);

module.exports = app;