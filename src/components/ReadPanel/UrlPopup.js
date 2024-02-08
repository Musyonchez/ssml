// UrlPopup.js
import React from "react";

const UrlPopup = ({
  urlInput,
  handleUrlInputChange,
  handleInsertUrlContent,
  handleCloseUrlPopup,
}) => {
  return (
    <div className="url-popup">
      <input
        type="text"
        value={urlInput}
        onChange={handleUrlInputChange}
        placeholder="Enter URL or select a document"
      />
      <button onClick={() => handleInsertUrlContent(urlInput)}>Insert</button>
      <button onClick={handleCloseUrlPopup}>Cancel</button>
    </div>
  );
};

export default UrlPopup;
