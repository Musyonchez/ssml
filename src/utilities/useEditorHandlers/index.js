// useEditorHandlers.js
import { useState, useRef } from "react";
import { handleEditorChange } from "./handleEditorChange";
import { handleCopyContent } from "./handleCopyContent";
import { handlePasteContent } from "./handlePasteContent";
import { handleFileInput } from "./handleFileInput";
import { handleKeyDown } from "./handleKeyDown";
import { handleUrlInputChange } from "./handleUrlInputChange";
import { handleOpenUrlPopup } from "./handleOpenUrlPopup";
import { handleCloseUrlPopup } from "./handleCloseUrlPopup";
import { handleDocEditorChange } from "./handleDocEditorChange";
import { handleInsertUrlContent } from "./handleInsertUrlContent";


const useEditorHandlers = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [showUrlPopup, setShowUrlPopup] = useState(false);

  return {
    editorRef,
    content,
    urlInput,
    setUrlInput,
    showUrlPopup,
    handleEditorChange: handleEditorChange(editorRef, setContent),
    handleCopyContent: handleCopyContent(content),
    handlePasteContent,
    handleFileInput,
    handleKeyDown,
    handleUrlInputChange: handleUrlInputChange(setUrlInput),
    handleOpenUrlPopup: handleOpenUrlPopup(setShowUrlPopup),
    handleCloseUrlPopup: handleCloseUrlPopup(setShowUrlPopup),
    handleInsertUrlContent: (url) => handleInsertUrlContent(url, setUrlInput, handleCloseUrlPopup, editorRef),
    handleDocEditorChange: (newContent) =>
      handleDocEditorChange(editorRef, setContent, newContent),
  };
};

export default useEditorHandlers;
