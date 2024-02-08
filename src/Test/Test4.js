import React, { useRef, useState } from 'react';
import DOMPurify from 'dompurify';

const RichTextEditor = () => {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');

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
      const clipboardData = await navigator.clipboard.readText();
      const sanitizedContent = DOMPurify.sanitize(clipboardData);
      document.execCommand('insertText', false, sanitizedContent);
      handleEditorChange(); // Update the content state
    }
  };

  return (
    <div>
      {/* Button to copy content */}
      <button onClick={handleCopyContent}>Copy Content</button>
      {/* Button to paste content */}
      <button onClick={handlePasteContent}>Paste Content</button>

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
    </div>
  );
};

export default RichTextEditor;
