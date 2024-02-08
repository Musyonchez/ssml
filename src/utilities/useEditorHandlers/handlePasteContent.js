import DOMPurify from "dompurify";
import { handleEditorChange } from "./handleEditorChange";


export const handlePasteContent = async () => {
  const clipboardData = await navigator.clipboard.readText();
  const sanitizedContent = DOMPurify.sanitize(clipboardData);
  document.execCommand("insertText", false, sanitizedContent);
  handleEditorChange(); // Update the content state
};