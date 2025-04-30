import React, { useEffect, useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/en-US";
import { Editor } from "@toast-ui/react-editor";

export default function BlogsEditor({ initialValue = "" }) {
  const editorRef = useRef();
  const [mode, setMode] = useState("markdown");
  const [content, setContent] = useState(initialValue);

useEffect(() => {
 console.log(content);
 
}, [content]);

  const handleImageUpload = async (blob, callback) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result, "image");
    reader.onerror = () => callback(null);
    reader.readAsDataURL(blob);
  };

  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"],
    ["ul", "ol", "task", "indent", "outdent"],
    ["table", "image", "link"],
    ["code", "codeblock"],
    ["scrollSync"],
  ];

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    setMode(newMode);
    editorRef.current.getInstance().changeMode(newMode);
  };

  const handleChange = () => {
    const content = editorRef.current.getInstance().getMarkdown();
    setContent(content);
  };

  return (
    <div className="markdown-editor-container w-full max-w-4xl mx-auto pt-4 sm:pt-8 mt-20 border border-gray-300 rounded-lg overflow-hidden">
      <div className="editor-toolbar px-3 py-1 border-b border-b-gray-300">
        <select
          value={mode}
          onChange={handleModeChange}
          className="mode-selector w-full sm:w-auto px-3 py-2 rounded border border-gray-400 text-sm sm:text-base"
        >
          <option value="markdown">Markdown Mode</option>
          <option value="wysiwyg">Visual Mode</option>
        </select>
      </div>

      <Editor
        ref={editorRef}
        initialValue={initialValue}
        initialEditType={mode}
        previewStyle="vertical"
        height="calc(100vh - 120px)"
        useCommandShortcut
        language="en-US"
        toolbarItems={toolbarItems}
        hooks={{ addImageBlobHook: handleImageUpload }}
        onChange={handleChange}
      />
    </div>
  );
}
