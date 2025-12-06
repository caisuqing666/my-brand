"use client";

import { useState } from "react";

export default function ToggleInfo() {
  const [show, setShow] = useState(false);

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
      <button
        onClick={() => setShow(!show)}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: "pointer",
          marginBottom: "12px",
        }}
      >
        {show ? "隐藏说明 ❌" : "显示说明 📘"}
      </button>

      {show && (
        <p style={{ margin: 0, color: "#555" }}>
          这是一个小说明文本。这个组件使用一个布尔 state 来控制是否显示。
        </p>
      )}
    </div>
  );
}
