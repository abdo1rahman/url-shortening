// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import process from "process";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/test", (req, res) => {
//   res.send("Server is working.");
// });

app.post("/shorten", async (req, res) => {
  const longUrl = req.body.url;

  if (!longUrl) return res.status(400).json({ error: "Missing URL" });

  try {
    const response = await fetch("https://cleanuri.com/api/v1/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `url=${encodeURIComponent(longUrl)}`,
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy failed", details: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
