// UrlPopup.js
import React from "react";

const UrlPopup = ({
  urlInput,
  handleUrlInputChange,
  handleInsertUrlContent,
  handleCloseUrlPopup,
}) => {
  return (
    <div className="url-popup bg-white p-4 rounded shadow-md ml-2">
      <input
        type="text"
        value={urlInput}
        onChange={handleUrlInputChange}
        placeholder="Enter URL"
        className="border border-gray-300 p-2 w-full mb-3 rounded"
      />
      <div className="flex justify-end">
        <button
          onClick={() => handleInsertUrlContent(urlInput)}
          className="bg-blue-500 text-white py-2 px-4 mr-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Insert
        </button>
        <button
          onClick={handleCloseUrlPopup}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray active:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UrlPopup;
