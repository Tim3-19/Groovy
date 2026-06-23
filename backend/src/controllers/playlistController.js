const playlistService = require("../services/playlistService");

/**

* Create Playlist
* POST /api/playlists
  */
  exports.createPlaylist = async (req, res) => {
  try {
  const { name, description, cover_url } = req.body;

  if (!name) {
  return res.status(400).json({
  success: false,
  message: "Playlist name is required",
  });
  }

  const playlist = await playlistService.createPlaylist({
  name,
  description,
  cover_url,
  });

  res.status(201).json({
  success: true,
  playlist,
  });
  } catch (error) {
  res.status(500).json({
  success: false,
  message: error.message,
  });
  }
  };

/**

* Get All Playlists
* GET /api/playlists
  */
  exports.getAllPlaylists = async (req, res) => {
  try {
  const playlists = await playlistService.getAllPlaylists();

  res.status(200).json({
  success: true,
  count: playlists.length,
  playlists,
  });
  } catch (error) {
  res.status(500).json({
  success: false,
  message: error.message,
  });
  }
  };

/**

* Get Single Playlist
* GET /api/playlists/:id
  */
  exports.getPlaylistById = async (req, res) => {
  try {
  const { id } = req.params;

  const playlist = await playlistService.getPlaylistById(id);

  if (!playlist) {
  return res.status(404).json({
  success: false,
  message: "Playlist not found",
  });
  }

  res.status(200).json({
  success: true,
  playlist,
  });
  } catch (error) {
  res.status(500).json({
  success: false,
  message: error.message,
  });
  }
  };

/**

* Add Song To Playlist
* POST /api/playlists/:playlistId/songs
  */
  exports.addSongToPlaylist = async (req, res) => {
  try {
  const { playlistId } = req.params;
  const { songId } = req.body;

  if (!songId) {
  return res.status(400).json({
  success: false,
  message: "songId is required",
  });
  }

  const result = await playlistService.addSongToPlaylist(
  playlistId,
  songId
  );

  res.status(200).json({
  success: true,
  result,
  });
  } catch (error) {
  res.status(500).json({
  success: false,
  message: error.message,
  });
  }
  };

/**

* Remove Song From Playlist
* DELETE /api/playlists/:playlistId/songs/:songId
  */
  exports.removeSongFromPlaylist = async (req, res) => {
  try {
  const { playlistId, songId } = req.params;

  await playlistService.removeSongFromPlaylist(
  playlistId,
  songId
  );

  res.status(200).json({
  success: true,
  message: "Song removed from playlist",
  });
  } catch (error) {
  res.status(500).json({
  success: false,
  message: error.message,
  });
  }
  };

/**

* Delete Playlist
* DELETE /api/playlists/:id
  */
  exports.deletePlaylist = async (req, res) => {
  try {
  const { id } = req.params;

  await playlistService.deletePlaylist(id);

  res.status(200).json({
  success: true,
  message: "Playlist deleted successfully",
  });
  } catch (error) {
  res.status(500).json({
  success: false,
  message: error.message,
  });
  }
  };
