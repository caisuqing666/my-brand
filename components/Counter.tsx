"use client";

import { useState } from "react";

export default function Counter() {
  // count 是当前数字，setCount 是用来修改数字的函数
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        marginTop: "16px",
        marginBottom: "24px",
        padding: "12px 16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        display: "inline-block",
      }}
    >
      <p style={{ margin: "0 0 8px" }}>这是一个小小计数器：{count}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        点我 +1
      </button>
    </div>
  );
}
