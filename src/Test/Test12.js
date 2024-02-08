import React, { useRef, useState } from "react";
import DOMPurify from "dompurify";
import mammoth from "mammoth";

import SynthesizeButton from "./SynthesizeButton";

const RichTextEditor = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [showUrlPopup, setShowUrlPopup] = useState(false);

  const handleEditorChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerText;
      setContent(newContent);
    }
  };

  const handleDocEditorChange = (newContent) => {
    if (editorRef.current) {
      // Clear existing content in the editor
      editorRef.current.innerHTML = "";

      // Append the new content to the editorRef
      const lines = newContent.split("\n");
      lines.forEach((line) => {
        const lineDiv = document.createElement("div");
        lineDiv.textContent = line;
        // Append the div element to the editorRef
        editorRef.current.appendChild(lineDiv);
      });

      // Trigger input event and update the content state
      setContent(newContent.trim());
    }
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(content);
  };

  const handlePasteContent = async () => {
    const clipboardData = await navigator.clipboard.readText();
    const sanitizedContent = DOMPurify.sanitize(clipboardData);
    document.execCommand("insertText", false, sanitizedContent);
    handleEditorChange(); // Update the content state
  };

  const handleKeyDown = async (event) => {
    // Check for Ctrl + V (Cmd + V on Mac)
    if ((event.ctrlKey || event.metaKey) && event.key === "v") {
      event.preventDefault();
      handlePasteContent();
    }
  };

  const handleUrlInputChange = (event) => {
    setUrlInput(event.target.value);
  };

  const handleOpenUrlPopup = () => {
    setShowUrlPopup(true);
  };

  const handleCloseUrlPopup = () => {
    setShowUrlPopup(false);
  };

  const handleInsertUrlContent = async () => {
    if (urlInput.startsWith("http://") || urlInput.startsWith("https://")) {
      handleUrlInput();
    } else {
      handleFileInput();
    }

    // Close the URL popup
    setUrlInput("");
    handleCloseUrlPopup();
  };

  const handleUrlInput = async () => {
    try {
      const response = await fetch(urlInput);
      const textContent = await response.text();
      console.log("Fetched content:", textContent);

      // Customize DOMPurify configuration to allow specific elements and styling attributes
      const purifyConfig = {
        ALLOWED_TAGS: [
          "p",
          "br",
          "a",
          "strong",
          "em",
          "ul",
          "ol",
          "li",
          "blockquote",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
        ],
        ALLOWED_ATTR: ["href", "src", "style", "class"],
      };

      const sanitizedContent = DOMPurify.sanitize(textContent, purifyConfig);

      // Use DOMParser to parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(sanitizedContent, "text/html");

      // Extract only the allowed elements
      const allowedElements = [
        "p",
        "br",
        "a",
        "strong",
        "em",
        "ul",
        "ol",
        "li",
        "blockquote",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ];
      const filteredNodes = Array.from(doc.body.childNodes).filter((node) => {
        return (
          node.nodeType === 1 &&
          allowedElements.includes(node.nodeName.toLowerCase())
        );
      });

      // Clear existing content in the editor
      if (editorRef.current) {
        editorRef.current.innerHTML = "";

        // Append the filtered nodes to the editorRef
        filteredNodes.forEach((node) => {
          editorRef.current.appendChild(node.cloneNode(true));
        });

        // Trigger input event and update the content state
        handleEditorChange();
      }
    } catch (error) {
      console.error("Error fetching content from URL:", error);
    }
  };

  const handleFileInput = async () => {
    // Handle file input here
    const fileInput = document.getElementById("fileInput");
    if (fileInput && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = async function (e) {
        const fileContent = e.target.result;

        try {
          const result = await mammoth.extractRawText({
            arrayBuffer: fileContent,
          });
          const textContent = result.value;

          // Process the text content as needed
          console.log("Extracted text content:", textContent);

          // Display the extracted content in the editor
          handleDocEditorChange(textContent);
        } catch (error) {
          console.error("Error extracting text from Word document:", error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      {/* Button to copy content */}
      <button onClick={handleCopyContent}>Copy Content</button>

      {/* Button to paste content */}
      <button onClick={handlePasteContent}>Paste Content</button>

      {/* Button to open URL or document popup */}
      <button onClick={handleOpenUrlPopup}>Insert URL or Document</button>

      {/* File input for document */}
      <label>
        Choosefile:
        <input
          type="file"
          className="border-2"
          id="fileInput"
          onChange={handleFileInput}
        />
      </label>

      {/* Editor component */}
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

      {/* SynthesizeButton component */}
      <SynthesizeButton editorContent={content} />

      {/* URL or Document Popup */}
      {showUrlPopup && (
        <div className="url-popup">
          <input
            type="text"
            value={urlInput}
            onChange={handleUrlInputChange}
            placeholder="Enter URL or select a document"
          />
          <button onClick={handleInsertUrlContent}>Insert</button>
          <button onClick={handleCloseUrlPopup}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
