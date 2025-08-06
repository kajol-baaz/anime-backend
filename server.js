const https = require("https");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable static file serving
app.use(express.static(__dirname + "/"));

// Enable CORS
app.use(cors());

const API = "https://api.jikan.moe/v4";

// Route for searching anime
app.get("/search", async (req, res) => {
  const anime = req.query.anime;
  try {
    const response = await axios.get(`${API}/anime`, {
      params: { q: anime },
    });
    res.json({ results: response.data.data });
  } catch (error) {
    console.error("Search Error:", error.message);
    res.status(500).json({ error: "Search failed." });
  }
});

// Route for recommendations
app.get("/recommendations", async (req, res) => {
  const animeId = req.query.animeId;
  try {
    const response = await axios.get(`${API}/anime/${animeId}/recommendations`);
    res.json({ recommendations: response.data.data });
  } catch (error) {
    console.error("Recommendation Error:", error.message);
    res.status(500).json({ error: "Recommendation fetch failed." });
  }
});

// Optional HTTPS Setup (uncomment if you have SSL certificate and key)
// const server = https.createServer({
//   key: fs.readFileSync("path/to/private.key"),
//   cert: fs.readFileSync("path/to/certificate.crt")
// }, app);

// server.listen(PORT, () => {
//   console.log(`Secure server running on port ${PORT}`);
// });
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../frontend/mini.html");
});

// Fallback HTTP Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
