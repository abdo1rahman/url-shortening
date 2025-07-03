import { useState } from "react";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState([]); // ✅ state!

  function handleChange(e) {
    setUrl(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    const longUrl = url.trim();
    const urlEncoded = encodeURIComponent(longUrl);

    fetch("http://localhost:3001/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `url=${urlEncoded}`,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result_url) {
          const shortUrl = data.result_url;

          // ✅ Update the state
          setResults((prev) => [...prev, [longUrl, shortUrl]]);
          setUrl(""); // optional: clear the input
        } else {
          console.error("API error:", data.error);
        }
      })
      .catch((err) => {
        console.error("Network error:", err);
      });
  };

  return (
    <>
      <div className="form-container">
        <div className="url-form">
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={handleChange}
            placeholder="Shorten a link here..."
          />
          <button type="submit" onClick={handleClick} className="shorten">
            Shorten it!
          </button>
        </div>
      </div>

      {/* ✅ Show results */}
      {results.map(([long, short], index) => (
        <div className="result" key={index}>
          <p className="long-url">{long}</p>
          <div>
            <p className="short-url">{short}</p>
            <button
              className="copy"
              onClick={() => navigator.clipboard.writeText(short)}
            >
              Copy
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
