const songService = require('../services/songService');

exports.getSongs = async (req, res) => {
  try {
    const songs = await songService.getAllSongs();

    res.status(200).json({
      success: true,
      data: songs
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getSong = async (req, res) => {
  try {
    const song = await songService.getSongById(req.params.id);

    res.status(200).json({
      success: true,
      data: song
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.createSong = async (req, res) => {
  try {
    const song = await songService.addSong(req.body);

    res.status(201).json({
      success: true,
      data: song
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};  