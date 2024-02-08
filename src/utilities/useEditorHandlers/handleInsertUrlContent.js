// handleInsertUrlContent.js
import { handleUrlInput } from "./handleUrlInput";

export const handleInsertUrlContent = async (urlInput, setUrlInput, handleCloseUrlPopup, editorRef) => {
    if (urlInput.startsWith("http://") || urlInput.startsWith("https://")) {
      handleUrlInput(urlInput, editorRef);  // Pass urlInput as an argument
    } else {
      handleFileInput(editorRef);  // Assuming there is a function named handleFileInput
    }

    // Close the URL popup
    setUrlInput("");
    handleCloseUrlPopup();
};
