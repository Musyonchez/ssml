// FileInput.js
import React from "react";

const FileInput = ({ handleFileInput }) => {
  return (
    <label>
      Choose file:
      <input
        type="file"
        className="border-2"
        id="fileInput"
        onChange={handleFileInput}
      />
    </label>
  );
};

export default FileInput;
