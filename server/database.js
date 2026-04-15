const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function setupDatabase() {
    const db = await open({
        filename: path.join(__dirname, 'database.db'),
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            genre TEXT,
            price REAL,
            original_price REAL,
            description TEXT,
            image_url TEXT,
            is_featured BOOLEAN DEFAULT 0,
            is_new BOOLEAN DEFAULT 0,
            platforms TEXT,
            features TEXT
        );

        CREATE TABLE IF NOT EXISTS license_keys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT UNIQUE NOT NULL,
            game_id INTEGER,
            is_redeemed BOOLEAN DEFAULT 0,
            FOREIGN KEY (game_id) REFERENCES games(id)
        );
    `);

    // Check if games table is empty before seeding
    const gamesCount = await db.get('SELECT COUNT(*) as count FROM games');
    if (gamesCount.count === 0) {
        const games = [
            {
                title: 'CYBERPULSE: REVENANT',
                genre: 'Tactical RPG / Action',
                price: 44.99,
                original_price: 59.99,
                description: 'Rewrite the architecture of the sprawl. A tactical RPG set in the heart of Sector 7.',
                image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBArKXkmlc_RdCywW6ZMiwVNqluYGJlhTCDlKYM7LtcIC-lHuVZrIIsvNqRuSTOb7dvFDaP6VCBXHcod4E1T76CO_r5-v5HkX5Pf2-eE-T6oLhuXG83wlVgDxcl9mXe86420XSATIkqN8HW5MJf3AZ5F8D6CZ0lKwAINwT5l8WQjpmsOmmEm1R9prs73WfTTeWoyrOXhNvcd9FyEla6DELMModQWkKAXjhbs9VcjrDpMFmCrnjVhgpmH8wjDaofodySt-MijlTDWJL',
                is_featured: 1,
                is_new: 0,
                platforms: JSON.stringify(['Windows']),
                features: JSON.stringify(['Controller Support', 'Cloud Saves', 'Multiplayer'])
            },
            {
                title: 'ELDEN SOULS',
                genre: 'Soulslike / Action / Dark Fantasy',
                price: 29.99,
                original_price: 29.99,
                description: 'A challenging action RPG in a dark fantasy world.',
                image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkvgdnFEjLky1fJCIUx6KJCN8_Of86buxo3unymfsM35IqSpFN8FoXuu55HO9bvWzbPMaldLHmZS-ELqA_UfkFbxhV_TnUhxyNNCkGBe4e3xFyXknOrQEGxnsSri_77KEZoLhSoz2T7F5yO5fEvYWtHTrBsG_tD8x2z3MdogB5nOvNPjOC7fTuN81PAMwJWWIWAu4s81fbDISIsLz87edx94t_bXhjqfObcqJe6SMTqj6KROarJCgpTE-UlxqUaziMjx18Aqaldvbu',
                is_featured: 0,
                is_new: 0,
                platforms: JSON.stringify(['Windows']),
                features: JSON.stringify(['Controller'])
            },
            {
                title: 'VOID DRIFTER',
                genre: 'Space / Exploration / Sandbox',
                price: 19.99,
                original_price: 19.99,
                description: 'Explore the infinite reaches of deep space in this sandbox adventure.',
                image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWozcRP-11Ob75FHrhvWsHWrqpUcJuYV-cVB3i5sQ1jo9Y83Nl0NnEg3tBK9iembhJ8cu60OxF0JmG2OQ-j5Zsixdb4wmt1F7vYAIkLK9dBR51kgui_0NYeECFzK_h5YOmKNokqNXkzKO70Yy00qnP2iFXPPOemtAsTf4NVufSRjWobyUPsoy1zfhm6vQe6T3qtlKrVd70xbhe9OyYGlb7NW-k6hNNi890J1LLhOLmwJB3dWWM-cEzXcGAndjhv9TkU0avH1wBqnQQ',
                is_featured: 0,
                is_new: 1,
                platforms: JSON.stringify(['Windows']),
                features: JSON.stringify(['VR Ready'])
            },
            {
                title: 'SYNTHETIC MIND',
                genre: 'Puzzle / Cyberpunk / Narrative',
                price: 14.99,
                original_price: 29.99,
                description: 'Hack into the collective consciousness in this narrative puzzle game.',
                image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlQe-8eDu7eIBmPajaLMiWfM8tikxZkfnfLHRpsxGuVRVGfS84GxRdK7eF2Jpg-toX5392lZAJrVwcaDFiQo22rdjXBGsN1z0VfKxRkqCMmVQZcDKGTJkytgFyCvF9OIsYai1aRt_BRSA2pS5xjL2T-x2eVuPf4mPcT64FJ86y4ym8GZhytYpYKx7Y6BkWuiY9iGKEEcHmM9r2EE6SQ-CjYUv5TyCHuictWiwOP8qMqtOLEw58UU-pnGdEaVfk7S0AY8Id28dffvu6',
                is_featured: 0,
                is_new: 0,
                platforms: JSON.stringify(['Windows']),
                features: JSON.stringify(['Cloud Saves'])
            },
            {
                title: 'VALOR REACH',
                genre: 'MOBA / Competitive / Strategy',
                price: 0,
                original_price: 0,
                description: 'Rise to the top in this fast-paced competitive strategy game.',
                image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgfLcz1lY_HT8tIu4QfEwDZYFxxLqs458_NxvlZV1dyXPRf3-vmQ2ervfL7XJsRTuWXBaZn1BhqpgYjB5Q25l8ONZTG6JJzVcYWoScz0ggooqhWeCJRo1CjphZQCQXbeaA04hapZ068F-vUA_T1zE04BoYP32e3L8J0_8s1nXvQJVlFVG-l6ssUcZ6KWil591u04-kWwq-wMt9a7dJn5fALiolaTmF1BB8INPlqdrPLWVpTI0EjCsFNAEI1X7C1NKAO2E68wwoqRGC',
                is_featured: 0,
                is_new: 0,
                platforms: JSON.stringify(['Windows']),
                features: JSON.stringify(['Multiplayer'])
            }
        ];

        for (const game of games) {
            await db.run(
                'INSERT INTO games (title, genre, price, original_price, description, image_url, is_featured, is_new, platforms, features) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [game.title, game.genre, game.price, game.original_price, game.description, game.image_url, game.is_featured, game.is_new, game.platforms, game.features]
            );
        }

        // Add some license keys
        await db.run('INSERT INTO license_keys (key, game_id) VALUES (?, ?)', ['KINETIC-123-ABC', 1]);
        await db.run('INSERT INTO license_keys (key, game_id) VALUES (?, ?)', ['VAULT-456-DEF', 2]);
    }

    return db;
}

module.exports = { setupDatabase };
