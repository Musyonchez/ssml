import { handlePasteContent } from "./handlePasteContent";

export const handleKeyDown = async (event) => {
  // Check for Ctrl + V (Cmd + V on Mac)
  if ((event.ctrlKey || event.metaKey) && event.key === "v") {
    event.preventDefault();
    handlePasteContent();
  }
};
