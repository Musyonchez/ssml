export const handleEditorChange = (editorRef, setContent) => () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerText;
      setContent(newContent);
    }
  };