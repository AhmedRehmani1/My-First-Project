# The Kinetic Vault - Game License Marketplace

A high-fidelity, full-stack game license marketplace with a "Neon Editorial" aesthetic.

## 🚀 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm (comes with Node.js)

### 2. Installation
```bash
# Install dependencies
npm install
```

### 3. Running the Server
```bash
# Start the backend and serve the frontend
npm start
```
The website will be available at `http://localhost:3000`.

---

## 🏗️ Project Structure

- `server/`: Backend logic (Express.js)
  - `index.js`: Main server and API endpoints.
  - `database.js`: SQLite initialization and seeding logic.
  - `database.db`: The SQLite database file (created on first run).
- `public/`: Frontend assets (HTML/JS/CSS)
  - `index.html`: Single Page Application (SPA) with Tailwind CSS.

---

## 📝 How to Add Information

### Adding New Games
To add more games to your store, you can modify the seeding logic in `server/database.js`. Find the `setupDatabase` function and add new entries to the `games` array:

```javascript
{
  title: 'Your New Game',
  genre: 'Action, RPG',
  price: 49.99,
  image_url: 'https://images.unsplash.com/...',
  platforms: 'Windows, macOS',
  features: 'Single-player, Steam Achievements'
}
```

After updating the file, you can delete `server/database.db` and restart the server to re-seed, or use a SQLite client to insert rows directly into the `games` table.

### Adding License Keys
License keys are stored in the `license_keys` table. To add keys that users can redeem:
1. Open `server/database.js`.
2. Add `INSERT` statements at the bottom of the `setupDatabase` function.
3. Keys should follow the format `KINETIC-XXXX-XXXX` (though the backend currently accepts any unique string you define).

---

## 🌐 Deployment Tips

### Local Network
To view the site on other devices in your home/office, find your local IP address and access it via `http://YOUR_IP:3000`.

### Production Deployment
1. **Hosting:** You can deploy this to platforms like **Render**, **Railway**, or **DigitalOcean**.
2. **Environment Variables:** For production, consider moving the port configuration to an environment variable (`process.env.PORT`).
3. **Database:** While SQLite is great for small-to-medium sites, for very high traffic, you might eventually migrate to PostgreSQL.
4. **Static Files:** In a high-traffic production environment, it is often better to serve the `public/` folder using a reverse proxy like **Nginx** or a CDN.

---

## 🛠️ API Documentation

- `GET /api/games`: Returns list of games. Query params: `search`, `genre`, `sort`.
- `GET /api/genres`: Returns list of unique genres.
- `POST /api/redeem`: Redeems a code. Body: `{ code: "YOUR-CODE" }`.
