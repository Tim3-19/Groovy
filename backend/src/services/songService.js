const supabase = require('../config/supabase');

const getAllSongs = async () => {
  const { data, error } = await supabase
    .from('songs')
    .select('*');

  if (error) throw error;

  return data;
};

const getSongById = async (id) => {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
};

const addSong = async (song) => {
  const { data, error } = await supabase
    .from('songs')
    .insert(song)
    .select();

  if (error) throw error;

  return data;
};

module.exports = {
  getAllSongs,
  getSongById,
  addSong,
};