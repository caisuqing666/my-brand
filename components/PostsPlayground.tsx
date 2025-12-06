"use client";

import { useState } from "react";
import PostCard from "./PostCard";

type Post = {
  id: number;
  title: string;
  body: string;
};

// 初始的帖子列表（跟你之前的 mockPosts 类似）
const initialPosts: Post[] = [
  { id: 1, title: "第一篇文章", body: "这是第一篇文章的内容。" },
  { id: 2, title: "第二篇文章", body: "这是第二篇文章的内容。" },
  { id: 3, title: "第三篇文章", body: "这是第三篇文章的内容。" },
  { id: 4, title: "第四篇文章", body: "这是第四篇文章的内容。" },
  { id: 5, title: "第五篇文章", body: "这是第五篇文章的内容。" },
];

export default function PostsPlayground() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 简单校验：空内容就不提交
    if (!title.trim() || !body.trim()) {
      alert("标题和内容都要填写哦～");
      return;
    }

    const newPost: Post = {
      id: posts.length + 1,
      title: title.trim(),
      body: body.trim(),
    };

    // 新帖子插到最前面
    setPosts([newPost, ...posts]);

    // 清空表单
    setTitle("");
    setBody("");
  };

  return (
    <section
      style={{
        marginTop: "24px",
        marginBottom: "24px",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "12px" }}>帖子练习场（可以新增）</h2>

      {/* 表单部分 */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "16px" }}>
        <div style={{ marginBottom: "8px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>标题：</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入帖子标题"
            style={{
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "8px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>内容：</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="输入帖子内容"
            rows={3}
            style={{
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          发布新帖子 🚀
        </button>
      </form>

      {/* 列表展示部分 */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
          />
        ))}
      </ul>
    </section>
  );
}
