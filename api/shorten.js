// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post("/shorten", async (req, res) => {
  const { url } = req.body;

  const response = await fetch("https://cleanuri.com/api/v1/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `url=${encodeURIComponent(url)}`,
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Proxy running on http://localhost:3001"));
