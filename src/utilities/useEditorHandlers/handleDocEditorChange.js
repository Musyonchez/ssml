export const handleDocEditorChange = (editorRef, setContent, newContent) => {
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