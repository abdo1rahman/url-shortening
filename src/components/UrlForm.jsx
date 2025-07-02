import React, { useState, useRef } from "react";
export default function UrlForm() {
  const [link, setLink] = useState("");

  function handleChange(e) {
    setLink(e.target.value);
  }

  const handleClick = (e) => {};

  return (
    <div className="form-container">
      <div className="url-form">
        <input
          id="url-input"
          type="text"
          value={link}
          onChange={handleChange}
          placeholder="Shorten a link here..."
        />
        <button type="submit" onClick={handleClick} className="shorten">
          Shorten it!
        </button>
      </div>
    </div>
  );
}
