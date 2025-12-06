"use client";

import { useState } from "react";

export default function TestPlayground({ title }: { title: string }) {
  // 内部小抽屉（state）
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>{title}</h2>

      {/* 按钮 + state */}
      <p>当前计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>点我加 1</button>

      <hr />

      {/* 输入框 */}
      <input
        value={text}
        placeholder="输入看看"
        onChange={(e) => setText(e.target.value)}
        style={{ marginTop: 10 }}
      />

      <p>你输入的是：{text}</p>
    </div>
  );
}
