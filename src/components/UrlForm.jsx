import React, { useState } from "react";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState([]);

  function handleChange(e) {
    setUrl(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault(); // optional if used inside a form
    const longUrl = url.trim();

    if (!longUrl) return;

    const urlEncoded = encodeURIComponent(longUrl);

    fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `url=${urlEncoded}`,
    })
      .then((res) => {
        let result = res.body.result_url;
        setResults([...results, [longUrl, result]]);
      })
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
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

      {results.length > 0 &&
        results.map((result, index) => (
          <div className="result" key={index}>
            <p className="long-url"> {result[0]} </p>
            <div>
              <p className="short-url"> {result[1]} </p>
              <button
                className="copy"
                onClick={() => {
                  navigator.clipboard.writeText(result[1]);
                }}
              >
                Copy
              </button>
            </div>
          </div>
        ))}
    </>
  );
}
