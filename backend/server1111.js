require('dotenv').config();
const express = require('express');
const cors = require('cors'); // 1. Import the cors package
const { supabase } = require('./SupaBaseClient'); // Supabase client

const app = express();

// 2. Enable CORS for the Vite dev server
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

app.use(express.json());

// 3. Routes
// Return the first song (or you can add query params later)

app.get('/api/current-song', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('songs')
            .select('id, title, artist, duration_seconds, cover_url, audio_url, created_at')
            .limit(1)
            .single();

        if (error) throw error;

        // Map the database fields to frontend variables
        const song = {
            id: data.id,
            name: data.title,                // DB 'title' → Frontend 'name'
            artist: data.artist,
            imageUrl: data.cover_url,        // DB 'cover_url' → Frontend 'imageUrl'
            audioUrl: data.audio_url,
            duration: data.duration_seconds, // optional, not used yet
            createdAt: data.created_at,
        };

        res.json(song);
    } catch (e) {
        console.error('Error fetching song:', e);
        res.status(500).json({ error: 'Failed to fetch song' });
    }
});
app.get('/api/test-connection', async (req, res) => {
    console.log("--- STARTING DATABASE CONNECTION TEST ---");

    try {
        // 1. Test if Supabase is reachable by asking for just the ID of one song
        const { data, error, status } = await supabase
            .from('songs')
            .select('id')
            .limit(1);

        if (error) {
            console.error("❌ SUPABASE REJECTED THE REQUEST:");
            console.error(error);
            return res.status(500).json({ success: false, message: "Database connection failed", error: error.message });
        }

        // 2. If we get here, the connection is perfect!
        console.log("✅ CONNECTION SUCCESSFUL. HTTP Status:", status);
        console.log("Data returned:", data);

        return res.json({
            success: true,
            message: "Connected to Supabase perfectly!",
            rowsFound: data.length
        });

    } catch (err) {
        console.error("❌ SERVER CRASHED DURING TEST:");
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});