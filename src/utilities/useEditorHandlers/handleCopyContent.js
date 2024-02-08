export const handleCopyContent = (content) => () => {
    navigator.clipboard.writeText(content);
  };