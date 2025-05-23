import React, { useEffect, useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/en-US";
import { Editor } from "@toast-ui/react-editor";
import Button from "../components/UI/Button/Button";
import Save from "../components/Icons/Save";
import Alert from "../components/UI/Alerts/Alert";
import Tag from "../components/UI/Tag/Tag.jsx";
import apiFetch from "../api/api";
import { useNavigate } from "react-router-dom";

export default function BlogsEditor({ initialValue = "" }) {
  const editorRef = useRef();
  const [mode, setMode] = useState("wysiwyg");
  const [content, setContent] = useState(initialValue);
  const [title, setTitle] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  const categories = JSON.parse(localStorage.getItem("categories"));
  const author_id = Number(localStorage.getItem("user-id"));
  const tags = JSON.parse(localStorage.getItem("tags"));

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

  function handleSubmit(e) {
    e.preventDefault();
    if (!image) {
      setError("Please select an image");
      return;
    }
    // Convertir l'image en base64
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      const base64Image = e.target.result;

      const body = {
        author_id: author_id,
        category_id: category_id,
        title: title,
        content: content,
        image: base64Image,
        tags: selectedTags,
      };

      apiFetch("blogs", "POST", body, setError)
        .then((data) => {
          setMessage(data.message);
          setError(null);
          const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
          localStorage.setItem("blogs", JSON.stringify([...blogs, data.blog]));
          const my_blogs = JSON.parse(localStorage.getItem("my_blogs") || "[]");
          localStorage.setItem("my_blogs", JSON.stringify([...my_blogs, data.blog]));
          navigate(`/blog-detail/${data.blog.id}`);
        })
        .catch((err) => {
          setError(err.message);
          setMessage(null);
        });
    };
  }

  return (
    <div className="-container w-full max-w-4xl mx-auto mt-28 overflow-hidden">
      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}
      {message && (
        <Alert
          type="success"
          message={message}
          onClose={() => setMessage(null)}
        />
      )}
      <div className="markdown-editor border border-gray-300 rounded-lg ">
        <form action="" className="">
          <div className="flex gap-4">
            <div className="flex-1 h-full">
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter title"
                className="w-full h-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex-1 h-full">
              <label htmlFor="category" className="sr-only">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="w-full h-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={category_id}
                onChange={(e) => setCategory_id(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 h-full">
              <label htmlFor="image" className="sr-only">
                Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                className="w-full h-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                onChange={(e) => {
                  console.error(e.target.files[0]);

                  setImage(e.target.files[0]);
                }}
                placeholder="cover"
              />
            </div>
          </div>
          <div className="px-4 py-1">
            <h4 htmlFor="tag">Tags:</h4>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <Tag
                  key={tag.id}
                  isSelected={selectedTags.includes(tag.id)}
                  onClick={() => {
                    if (selectedTags.includes(tag.id)) {
                      setSelectedTags(
                        selectedTags.filter((id) => id !== tag.id)
                      );
                    } else {
                      setSelectedTags([...selectedTags, tag.id]);
                    }
                  }}
                  name={tag.name}
                  color={tag.color}
                />
              ))}
            </div>
          </div>
        </form>
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
          height="calc(80vh)"
          useCommandShortcut
          language="en-US"
          toolbarItems={toolbarItems}
          hooks={{ addImageBlobHook: handleImageUpload }}
          onChange={handleChange}
        />
      </div>
      <Button
        type="submit"
        onClick={handleSubmit}
        className="ml-auto flex gap-2 mt-4 mb-6 py-2.5 bg-secondary text-white hover:bg-secondary/90"
      >
        Submit <Save />
      </Button>
    </div>
  );
}