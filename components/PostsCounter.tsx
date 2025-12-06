"use client";

import { useState } from "react";

type PostsCounterProps = {
  total: number; // 总帖子数量
};

export default function PostsCounter({ total }: PostsCounterProps) {
  const [readCount, setReadCount] = useState(0);

  const handleReadOneMore = () => {
    if (readCount < total) {
      setReadCount(readCount + 1);
    } else {
      alert("太棒了，你已经把所有帖子都看完啦！🎉");
    }
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
      <p style={{ margin: "0 0 8px" }}>
        当前共有 <strong>{total}</strong> 条帖子。
      </p>
      <p style={{ margin: "0 0 8px" }}>
        你已阅读：<strong>{readCount}</strong> 条。
      </p>
      <button
        onClick={handleReadOneMore}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        我又读完了一条帖子 📖
      </button>
    </div>
  );
}

