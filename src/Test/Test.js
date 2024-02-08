// Import necessary dependencies
import React, { useState, useRef, useEffect } from 'react';
import { Editor, EditorState, ContentState, convertFromHTML, convertToRaw, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Html } from 'next/document';

// Define the RichTextEditor component
const RichTextEditor = () => {
  const editorRef = useRef(null);

  // State to manage the editor content
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // Handle changes in the editor content
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  // Handle pasting content into the editor
  const handlePaste = (text, html, editorState) => {
    if (!editorState) {
      return;
    }

    // Ensure html is a string before proceeding
    if (typeof html !== 'string') {
      return;
    }

    // Trim any unnecessary whitespace from the html
    const trimmedHtml = html.trim();

    // Check if the trimmedHtml is empty before proceeding
    if (!trimmedHtml) {
      return;
    }

    const blocksFromHTML = convertFromHTML(trimmedHtml);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    const newEditorState = EditorState.push(editorState, state, 'insert-characters');
    setEditorState(newEditorState);
  };

  // Handle copying the content from the editor
  const handleCopyContent = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = rawContentState.blocks.map((block) => block.text).join('\n');
    navigator.clipboard.writeText(content);
  };

  // Handle pasting content into the editor as if pasted directly
  const handlePasteContent = async () => {
    const clipboardData = await navigator.clipboard.readText();
    const newContentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      clipboardData
    );
    const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
    setEditorState(newEditorState);
  };

   // Add event listeners for keyboard shortcuts
   useEffect(() => {
    const handleKeyCommand = (command) => {
      const newState = EditorState.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return 'handled';
      }
      return 'not-handled';
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        // Handle Backspace and Delete as needed
        // For example, prevent deleting if there's no selected text
        if (editorState.getSelection().isCollapsed()) {
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editorState]);

    

  // Render the component
  return (
    <div>
      {/* Button to copy content */}
      <button onClick={handleCopyContent}>Copy Content</button>

      {/* Button to paste content */}
      <button onClick={handlePasteContent}>Paste Content</button>

      {/* Editor component */}
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        onPaste={handlePaste}
        placeholder="Drag and drop your files, or type, paste, and edit text here.\n\nWordWave is a revolutionary platform that offers cutting-edge speech-to-text technology, allowing you to effortlessly convert spoken words into written text. With WordWave, you can easily transcribe audio files, lectures, meetings, and more, making it an indispensable tool for professionals, students, and anyone looking to streamline their workflow and boost productivity...."
        ref={editorRef}
      />
    </div>
  );
};

// Export the RichTextEditor component
export default RichTextEditor;