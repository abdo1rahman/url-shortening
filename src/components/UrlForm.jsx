import React, { useState, useEffect } from "react";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [inputError, setInputError] = useState(false);
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
    e.preventDefault();
    if (url.length > 0) {
      setInputError(false);
      const longUrl = url.trim();
      const url40 =
        longUrl.length > 40 ? longUrl.slice(0, 40) + "..." : longUrl;

      if (!longUrl) return;

      fetch("http://localhost:3001/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `url=${encodeURIComponent(longUrl)}`,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result_url) {
            const shortUrl = data.result_url;
            setResults((prev) => [...prev, [url40, shortUrl]]);
            setUrl("");
          } else {
            console.error("API error:", data.error);
          }
        })
        .catch((err) => console.error("Network error:", err));
    } else setInputError(true);
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
      <div className="form-container">
        <div className="url-form">
          <input
            id="url-input"
            className={inputError && "error"}
            type="text"
            value={url}
            onChange={handleChange}
            placeholder="Shorten a link here..."
            required
          />
          {inputError && <p className="error-msg">Please add a link</p>}

          <button className="shorten" onClick={handleClick}>
            Shorten it!
          </button>
        </div>
      </div>

      {results.map(([long, short], i) => (
        <div className="result" key={i}>
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
        </div>
      ))}
    </>
  );
}
