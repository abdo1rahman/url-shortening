import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Loader from "./Loader.jsx";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);
  // Making sure the state of the shortened links persists even after page reload
  const [results, setResults] = useState(() => {
    // Load from localStorage on first render
    const stored = localStorage.getItem("shortenedResults");
    return stored ? JSON.parse(stored) : [];
  });

  // Saving new items inside the `results` array
  useEffect(() => {
    localStorage.setItem("shortenedResults", JSON.stringify(results));
  }, [results]);

  const handleChange = (e) => setUrl(e.target.value);

  const handleClick = (e) => {
    if (url.length > 0) {
      setLoading(true);

      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url)) {
        setInputError("Looks like an email, not a URL.");
        setLoading(false);
        return;
      }

      let cleanedUrl = url.trim();
      if (/^http:\/\//i.test(cleanedUrl)) {
        cleanedUrl = cleanedUrl.replace(/^http:\/\//i, "https://");
      } else if (!/^https:\/\//i.test(cleanedUrl)) {
        cleanedUrl = "https://" + cleanedUrl;
      }

      try {
        const longUrl = new URL(cleanedUrl);
        setUrl(cleanedUrl);
      } catch (err) {
        setInputError("Invalid URL");
        setLoading(false);
        return;
      }

      const url40 =
        cleanedUrl.length > 40 ? cleanedUrl.slice(0, 40) + "..." : cleanedUrl;

      if (!cleanedUrl) return;

      fetch("https://shortly-api-78zc.onrender.com/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `url=${encodeURIComponent(cleanedUrl)}`,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result_url) {
            const shortUrl = data.result_url;
            setResults((prev) => [...prev, [url40, shortUrl]]);
            setUrl("");
            setInputError("");
            setLoading(false);
          } else {
            console.error("API error:", data.error);
          }
        })
        .catch((err) => console.error("Network error:", err));
    } else setInputError("Please add a link");
  };

  function copy(event, link) {
    const btn = event.target;
    btn.disabled = true;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        btn.classList.add("copied");
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.classList.remove("copied");
          btn.textContent = "Copy";
          btn.disabled = false;
        }, 3000);
      })
      .catch((err) => {
        console.error("Copy failed:", err);
        alert("Failed to copy link.");
        btn.disabled = false;
      });
  }

  return (
    <>
      <div id="form-container" className="form-container">
        <div className="url-form">
          <input
            id="url-input"
            className={inputError.length > 0 && "error"}
            type="text"
            value={url}
            onChange={handleChange}
            placeholder="Shorten a link here..."
            required
          />
          {inputError.length > 0 && <p className="error-msg">{inputError}</p>}
          {loading && (
            <p className="error-msg">
              Please wait, the server might take long to load
            </p>
          )}
          <button className="shorten" onClick={handleClick}>
            {loading ? <Loader /> : "Shorten it!"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {results.map(([long, short], i) => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition="0.2s"
            className="result"
            key={i}
          >
            <p className="long-url">{long}</p>
            <hr className="links-hr" />
            <div>
              <p className="short-url">{short}</p>
              <button
                className="copy"
                aria-live="polite"
                onClick={(event) => copy(event, short)}
              >
                Copy
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
