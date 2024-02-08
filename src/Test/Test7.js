import React, { useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import SynthesizeButton from './SynthesizeButton';

const RichTextEditor = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [showUrlPopup, setShowUrlPopup] = useState(false);

  const handleEditorChange = () => {
    const newContent = editorRef.current.innerText;
    setContent(newContent);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(content);
  };

  const handlePasteContent = async () => {
    const clipboardData = await navigator.clipboard.readText();
    const sanitizedContent = DOMPurify.sanitize(clipboardData);
    document.execCommand('insertText', false, sanitizedContent);
    handleEditorChange(); // Update the content state
  };

  const handleKeyDown = async (event) => {
    // Check for Ctrl + V (Cmd + V on Mac)
    if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
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
    if (urlInput.startsWith('http://') || urlInput.startsWith('https://')) {
      try {
        const response = await fetch(urlInput);
        const textContent = await response.text();
        const sanitizedContent = DOMPurify.sanitize(textContent);
  
        // Use innerText to directly set the content of the editor
        editorRef.current.innerText = sanitizedContent;
        handleEditorChange(); // Update the content state
      } catch (error) {
        console.error('Error fetching content from URL:', error);
      }
    }
  
    setUrlInput('');
    handleCloseUrlPopup();
  };
  

  return (
    <div>
      {/* Button to copy content */}
      <button onClick={handleCopyContent}>Copy Content</button>

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
          border: '1px solid #ccc',
          minHeight: '100px',
          padding: '10px',
          marginBottom: '10px',
        }}
      ></div>

      {/* SynthesizeButton component */}
      <SynthesizeButton editorContent={content} />

      {/* URL Popup */}
      {showUrlPopup && (
        <div className="url-popup">
          <input type="text" value={urlInput} onChange={handleUrlInputChange} placeholder="Enter URL" />
          <button onClick={handleInsertUrlContent}>Insert</button>
          <button onClick={handleCloseUrlPopup}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
