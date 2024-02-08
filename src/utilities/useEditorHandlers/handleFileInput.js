// handleFileInput.js
import mammoth from "mammoth";
import { handleDocEditorChange } from "./handleDocEditorChange";

export const handleFileInput = async (editorRef, setContent) => {
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
        handleDocEditorChange(editorRef, setContent, textContent);
      } catch (error) {
        console.error("Error extracting text from Word document:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  }
};
