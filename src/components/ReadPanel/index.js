// RichTextEditor.js
import React from "react";
import useEditorHandlers from "../../utilities/useEditorHandlers";
import CopyContentButton from "./CopyContentButton";
import PasteContentButton from "./PasteContentButton";
import UrlPopup from "./UrlPopup";
import FileInput from "./FileInput";
import Editor from "./Editor";
import InsertButton from "./InsertButton";
import SynthesizeButton from "../SynthesizeButton";

const RichTextEditor = () => {
  const {
    editorRef,
    content,
    urlInput,
    showUrlPopup,
    handleEditorChange,
    handleCopyContent,
    handleUrlInputChange,
    handleOpenUrlPopup,
    handleCloseUrlPopup,
    handlePasteContent,
    handleFileInput,
    handleKeyDown,
    handleInsertUrlContent,
    setUrlInput, // Add setUrlInput to the destructured variables
  } = useEditorHandlers();

  return (
    <div>
      {/* ... (unchanged) */}

      {/* Copy Content Button */}
      <CopyContentButton handleCopyContent={handleCopyContent} />

      {/* Paste Content Button */}
      <PasteContentButton handlePasteContent={handlePasteContent} />

      {/* Insert Button */}
      <InsertButton
        handleOpenUrlPopup={handleOpenUrlPopup}
        handleInsertUrlContent={() => handleInsertUrlContent(urlInput)} // Pass urlInput as a parameter
      />

      {/* File Input for Document */}
      <FileInput handleFileInput={() => handleFileInput(editorRef, content)} />

      {/* Editor Component */}
      <Editor
        editorRef={editorRef}
        handleEditorChange={handleEditorChange}
        handleKeyDown={handleKeyDown}
      />

      {/* SynthesizeButton Component */}
      <SynthesizeButton editorContent={content} />

      {/* URL or Document Popup */}
      {showUrlPopup && (
        <UrlPopup
          urlInput={urlInput}
          handleUrlInputChange={handleUrlInputChange}
          handleInsertUrlContent={() => handleInsertUrlContent(urlInput)} // Pass only urlInput as a parameter
          handleCloseUrlPopup={handleCloseUrlPopup}
        />
      )}
    </div>
  );
};

export default RichTextEditor;
