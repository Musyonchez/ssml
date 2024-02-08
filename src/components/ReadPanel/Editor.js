// Editor.js
import React, { useRef } from "react";

const Editor = ({ editorRef, handleEditorChange, handleKeyDown }) => {
  return (
    <div
      ref={editorRef}
      contentEditable
      onInput={handleEditorChange}
      onKeyDown={handleKeyDown}
      placeholder="Type, paste, and edit text here..."
      style={{
        border: "1px solid #ccc",
        minHeight: "100px",
        padding: "10px",
        marginBottom: "10px",
      }}
    ></div>
  );
};

export default Editor;
