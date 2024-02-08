// Import necessary dependencies
import React, { useState, useRef, useEffect } from "react";
import { Editor, EditorState, convertToRaw, Modifier } from "draft-js";
import "draft-js/dist/Draft.css";

// Define the RichTextEditor component
const RichTextEditor = () => {
  const editorRef = useRef(null);

  // State to manage the editor content
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // Handle changes in the editor content
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  // Handle copying the content from the editor
  const handleCopyContent = () => {
    const content = editorState.getCurrentContent().getPlainText(); // Get plain text directly
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
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "insert-characters"
    );
    setEditorState(newEditorState);
  };

  // Add event listeners for keyboard shortcuts
// ...

// Add event listeners for keyboard shortcuts
useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace') {
        const selection = editorState.getSelection();
        const isFirstBlock = selection.getStartKey() === editorState.getCurrentContent().getFirstBlock().getKey();
        
        if (selection.isCollapsed() && selection.getStartOffset() === 0 && !isFirstBlock) {
          // If the cursor is at the beginning of a block and not the first block, prevent default behavior
          event.preventDefault();
  
          // Scroll the editor to the correct position
          const editor = editorRef.current;
          const currentContent = editorState.getCurrentContent();
          const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
          const blockNode = document.querySelector(`[data-offset-key="${currentBlock.getKey()}-0-0"]`);
  
          if (blockNode) {
            const editorRect = editor.getBoundingClientRect();
            const blockRect = blockNode.getBoundingClientRect();
            const scrollY = blockRect.top - editorRect.top - editorRect.height / 2;
            window.scrollTo({ top: scrollY, behavior: 'smooth' });
          }
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
        placeholder="Drag and drop your files, or type, paste, and edit text here.\n\nWordWave is a revolutionary platform that offers cutting-edge speech-to-text technology, allowing you to effortlessly convert spoken words into written text. With WordWave, you can easily transcribe audio files, lectures, meetings, and more, making it an indispensable tool for professionals, students, and anyone looking to streamline their workflow and boost productivity...."
        ref={editorRef}
      />
    </div>
  );
};

// Export the RichTextEditor component
export default RichTextEditor;
