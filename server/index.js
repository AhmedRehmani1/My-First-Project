const express = require('express');
const cors = require('cors');
const path = require('path');
const { setupDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

let db;

// API Routes
app.get('/api/games', async (req, res) => {
    try {
        const { genre, search, sort } = req.query;
        let query = 'SELECT * FROM games WHERE 1=1';
        const params = [];

        if (genre && genre !== 'All') {
            query += ' AND genre LIKE ?';
            params.push(`%${genre}%`);
        }

        if (search) {
            query += ' AND (title LIKE ? OR description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        if (sort === 'Price: Low to High') {
            query += ' ORDER BY price ASC';
        } else if (sort === 'Price: High to Low') {
            query += ' ORDER BY price DESC';
        }

        const games = await db.all(query, params);
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/genres', async (req, res) => {
    try {
        const games = await db.all('SELECT genre FROM games');
        const genres = new Set();
        games.forEach(g => {
            g.genre.split('/').forEach(s => genres.add(s.trim()));
        });
        res.json(['All', ...Array.from(genres)]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/redeem', async (req, res) => {
    const { key } = req.body;
    try {
        const license = await db.get('SELECT * FROM license_keys WHERE key = ?', [key]);
        if (!license) {
            return res.status(404).json({ error: 'Invalid license key' });
        }
        if (license.is_redeemed) {
            return res.status(400).json({ error: 'Key already redeemed' });
        }

        await db.run('UPDATE license_keys SET is_redeemed = 1 WHERE id = ?', [license.id]);
        const game = await db.get('SELECT * FROM games WHERE id = ?', [license.game_id]);

        res.json({ message: 'Success', game });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
setupDatabase().then(database => {
    db = database;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
