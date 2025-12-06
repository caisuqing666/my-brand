"use client";

import { useState } from "react";

type Message = {
  id: number;
  author: string;
  text: string;
};

export default function MessageBoard() {
  const [name, setName] = useState(""); // 昵称
  const [content, setContent] = useState(""); // 留言内容
  const [messages, setMessages] = useState<Message[]>([]); // 留言列表

  const handleSubmit = () => {
    // 去掉前后空格
    const trimmedName = name.trim();
    const trimmedContent = content.trim();

    // 简单校验：不能为空
    if (!trimmedName || !trimmedContent) {
      alert("昵称和内容都要填写哦～");
      return;
    }

    // 新留言对象
    const newMessage = {
      id: Date.now(), // 简单用时间戳当 id
      author: trimmedName,
      text: trimmedContent,
    };

    // 更新列表
    setMessages([...messages, newMessage]);

    // 清空输入框
    setContent("");
  };

  return (
    <div
      style={{
        marginTop: 24,
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2>💬 迷你留言板</h2>

      {/* 昵称输入框 */}
      <div style={{ marginBottom: 10 }}>
        <input
          value={name}
          placeholder="你的昵称"
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 10 }}
        />
      </div>

      {/* 内容输入框 */}
      <div style={{ marginBottom: 10 }}>
        <textarea
          value={content}
          placeholder="想说点什么？"
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
        />
      </div>

      {/* 提交按钮 */}
      <button onClick={handleSubmit}>发布留言</button>

      {/* 留言列表 */}
      <ul style={{ marginTop: 20 }}>
        {messages.map((msg) => (
          <li
            key={msg.id}
            style={{
              marginBottom: 10,
              padding: 10,
              border: "1px solid #eee",
              borderRadius: 6,
            }}
          >
            <strong>{msg.author}：</strong>
            <span>{msg.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
