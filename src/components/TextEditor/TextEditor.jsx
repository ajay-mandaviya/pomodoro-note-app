import React, { useState } from "react";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import "./textEditor.css";
const TextEditor = (props) => {
  const { value, setValue } = props;
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  return (
    <div>
      <ReactQuill
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue}
      ></ReactQuill>
    </div>
  );
};

export { TextEditor };
