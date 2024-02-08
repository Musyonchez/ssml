import DOMPurify from "dompurify";
import { handleEditorChange } from "./handleEditorChange";



export const handleUrlInput = async (urlInput, editorRef) => {
    try {
      const response = await fetch(urlInput);
      const textContent = await response.text();
      console.log("Fetched content:", textContent);

      // Customize DOMPurify configuration to allow specific elements and styling attributes
      const purifyConfig = {
        ALLOWED_TAGS: [
          "p",
          "br",
          "a",
          "strong",
          "em",
          "ul",
          "ol",
          "li",
          "blockquote",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
        ],
        ALLOWED_ATTR: ["href", "src", "style", "class"],
      };

      const sanitizedContent = DOMPurify.sanitize(textContent, purifyConfig);

      // Use DOMParser to parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(sanitizedContent, "text/html");

      // Extract only the allowed elements
      const allowedElements = [
        "p",
        "br",
        "a",
        "strong",
        "em",
        "ul",
        "ol",
        "li",
        "blockquote",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ];
      const filteredNodes = Array.from(doc.body.childNodes).filter((node) => {
        return (
          node.nodeType === 1 &&
          allowedElements.includes(node.nodeName.toLowerCase())
        );
      });

      // Clear existing content in the editor
      if (editorRef.current) {
        editorRef.current.innerHTML = "";

        // Append the filtered nodes to the editorRef
        filteredNodes.forEach((node) => {
          editorRef.current.appendChild(node.cloneNode(true));
        });

        // Trigger input event and update the content state
        handleEditorChange();
      }
    } catch (error) {
      console.error("Error fetching content from URL:", error);
    }
  };