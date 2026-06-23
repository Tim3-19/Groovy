const express = require("express");
const router = express.Router();

const { playlistSongs } = require("../controllers/playlistController");

router.get("/", playlistSongs);

module.exports = router;