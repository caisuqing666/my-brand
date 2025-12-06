"use client";

import { useState } from "react";

export default function TextPreview() {
  // inputValue 用来保存当前输入框里的内容
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div
      style={{
        marginTop: "16px",
        marginBottom: "24px",
        padding: "12px 16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: 500,
        }}
      >
        输入一些文字试试：
      </label>

      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="在这里输入..."
        style={{
          padding: "6px 8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          width: "100%",
          boxSizing: "border-box",
          marginBottom: "12px",
        }}
      />

      <p style={{ margin: 0 }}>
        <span style={{ color: "#666" }}>预览：</span>{" "}
        <strong>{inputValue || "（这里会实时显示你输入的内容）"}</strong>
      </p>
    </div>
  );
}
