// InsertButton.js
import React from "react";

const InsertButton = ({ handleOpenUrlPopup }) => {
  return (
    <button onClick={handleOpenUrlPopup}>
      Insert URL or Document
    </button>
  );
};

export default InsertButton;
