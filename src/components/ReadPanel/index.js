import React, { useState } from "react";
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
  } = useEditorHandlers();

  const [sidebarWidth, setSidebarWidth] = useState(1); // Initial width of the sidebar

  const toggleSidebar = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 1 ? 2 : 1));
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={` min-h-screen fixed ${
          sidebarWidth === 1 ? "w-1/12" : "w-3/12"
        } bg-gray-200 flex flex-col p-4 overflow-y-auto transition-all duration-300 space-y-2 mt-20`}
      >
        {/* Toggle Button */}
        <button
          className="text-white flex justify-end bg-gray-500 px-2 py-1 mb-2 rounded"
          onClick={() => {
            toggleSidebar();
            handleCloseUrlPopup();
          }}
        >
          {sidebarWidth === 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>

        {/* Copy Content Button */}
        <CopyContentButton
          handleCopyContent={handleCopyContent}
          sidebarWidth={sidebarWidth}
        />

        {/* Paste Content Button */}
        <PasteContentButton
          handlePasteContent={handlePasteContent}
          sidebarWidth={sidebarWidth}
        />

        {/* Insert Button */}
        <InsertButton
          handleOpenUrlPopup={handleOpenUrlPopup}
          handleCloseUrlPopup={handleCloseUrlPopup}
          handleInsertUrlContent={() => handleInsertUrlContent(urlInput)}
          sidebarWidth={sidebarWidth}
          setSidebarWidth={setSidebarWidth}
        />

        {/* File Input for Document */}
        <FileInput
          handleFileInput={() => handleFileInput(editorRef, content)}
          sidebarWidth={sidebarWidth}
        />

        {/* URL or Document Popup */}
        {showUrlPopup && (
          <UrlPopup
            urlInput={urlInput}
            handleUrlInputChange={handleUrlInputChange}
            handleInsertUrlContent={() => handleInsertUrlContent(urlInput)}
            handleCloseUrlPopup={handleCloseUrlPopup}
          />
        )}
      </div>

      {/* Main Content Area */}
      <div className=" flex justify-end w-full mt-20 px-5">
        <div
          className={`flex flex-col overflow-hidden space-y-3 ${
            sidebarWidth === 1
              ? "w-11/12"
              : "w-9/12 transition-all duration-300"
          }`}
        >
          
          {/* SynthesizeButton Component */}
          <SynthesizeButton editorContent={content} />

          {/* Editor Component */}
          <Editor
            editorRef={editorRef}
            handleEditorChange={handleEditorChange}
            handleKeyDown={handleKeyDown}
            className="border border-gray-300 p-4 h-full"
          />

        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
