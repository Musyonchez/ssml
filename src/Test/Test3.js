
import React, { useState } from 'react';
import { Editor, EditorState, ContentState, convertFromHTML, convertToRaw, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleCopyContent = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = rawContentState.blocks.map((block) => block.text).join('\n');
    navigator.clipboard.writeText(content);
  };

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

  return (
    <div>
      <button onClick={handleCopyContent}>Copy Content</button>
      <button onClick={handlePasteContent}>Paste Content</button>

      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        placeholder="Type, paste, and edit text here..."
      />
    </div>
  );
};

export default RichTextEditor;
