import React, { useRef, useState } from "react";
import DOMPurify from "dompurify";
const cheerio = require("cheerio");
import SynthesizeButton from "./SynthesizeButton";

const RichTextEditor = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [showUrlPopup, setShowUrlPopup] = useState(false);

  const handleEditorChange = () => {
    const newContent = editorRef.current.innerText;
    setContent(newContent);
  };

  const handleURLEditorChange = () => {
    if (editorRef.current) {
      const childNodes = editorRef.current.childNodes;
      let newContent = "";
  
      // Concatenate text content of each child node
      childNodes.forEach((node) => {
        if (node.nodeType === 3) { // Node.TEXT_NODE
          newContent += node.textContent;
        } else {
          // For non-text nodes, append a line break
          newContent += '\n';
        }
      });
  
      setContent(newContent.trim()); // Trim to remove leading/trailing whitespace
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
      try {
        const response = await fetch(urlInput);
        const textContent = await response.text();
        console.log("Fetched content:", textContent);
  
        // Customize DOMPurify configuration to disallow specific elements
        const purifyConfig = {
          ALLOWED_TAGS: ['p', 'br', 'a', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
          ALLOWED_ATTR: ['href', 'src', 'style'],
        };
  
        const sanitizedContent = DOMPurify.sanitize(textContent, purifyConfig);
        console.log("Sanitized content:", sanitizedContent);
  
        // Use DOMParser to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(sanitizedContent, 'text/html');
        const bodyContent = doc.body.innerHTML;
        console.log("Body content:", bodyContent);
  
        if (bodyContent !== null) {
          // Ensure that editorRef.current is defined
          if (editorRef.current) {
            // Clear existing content in the editor
            editorRef.current.innerHTML = '';
  
            // Append the parsed HTML content to the editorRef
            editorRef.current.innerHTML = bodyContent;
  
            // Trigger input event and update the content state
            handleURLEditorChange();
          }
        } else {
          console.error("Error extracting body content.");
        }
      } catch (error) {
        console.error("Error fetching content from URL:", error);
      }
    }
  
    setUrlInput("");
    handleCloseUrlPopup();
  };
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  

  return (
    <div>
      {/* Button to copy content */}
      <button onClick={handleCopyContent}>Copy Content</button>

      {/* Button to paste content */}
      <button onClick={handlePasteContent}>Paste Content</button>

      {/* Button to open URL popup */}
      <button onClick={handleOpenUrlPopup}>Insert URL</button>

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

      {/* URL Popup */}
      {showUrlPopup && (
        <div className="url-popup">
          <input
            type="text"
            value={urlInput}
            onChange={handleUrlInputChange}
            placeholder="Enter URL"
          />
          <button onClick={handleInsertUrlContent}>Insert</button>
          <button onClick={handleCloseUrlPopup}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
