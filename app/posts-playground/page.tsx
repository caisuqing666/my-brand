"use client";

import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  weather: string;
};

export default function PostsPlaygroundPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [weather, setWeather] = useState("晴天");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 第一次加载页面时，去拿列表
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setError(null);
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("加载失败");
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err) {
        setError("加载帖子失败，请稍后再试");
      } finally {
        setInitialLoading(false);
      }
    };

    loadPosts();
  }, []);

  // 提交表单，新增一条帖子
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: trimmed, weather }),
      });

      if (!res.ok) throw new Error("创建失败");

      const newPost: Post = await res.json();

      // 把新帖子加到列表最前面
      setPosts((prev) => [newPost, ...prev]);
      setTitle("");
      setWeather("晴天");
    } catch (err) {
      setError("新增帖子失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        maxWidth: "640px",
        margin: "0 auto",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: 600 }}>
        Posts Playground（蔡蔡的全栈练习场）
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="在这里输入新帖子标题，比如：我今天又向全栈迈进了一步～"
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          />
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "14px",
              background: "white",
              cursor: "pointer",
            }}
          >
            <option value="晴天">☀️ 晴天</option>
            <option value="多云">☁️ 多云</option>
            <option value="阴天">🌫️ 阴天</option>
            <option value="小雨">🌦️ 小雨</option>
            <option value="大雨">🌧️ 大雨</option>
            <option value="雪天">❄️ 雪天</option>
            <option value="未知天气">❓ 未知天气</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              background: "#111827",
              color: "white",
              fontSize: "14px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "添加中…" : "添加"}
          </button>
        </div>
      </form>

      {error && (
        <p style={{ color: "#dc2626", fontSize: "13px" }}>
          {error}
        </p>
      )}

      <section
        style={{
          marginTop: "8px",
          paddingTop: "8px",
          borderTop: "1px solid #eee",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "8px" }}>
          当前帖子列表
        </h2>

        {initialLoading ? (
          <p>加载中…</p>
        ) : posts.length === 0 ? (
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            暂无帖子，可以先添加一条试试～
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {posts.map((post) => (
              <li
                key={post.id}
                style={{
                  padding: "8px 10px",
                  marginBottom: "6px",
                  borderRadius: "6px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  fontSize: "14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <strong style={{ marginRight: "6px" }}>#{post.id}</strong>
                  <span>{post.title}</span>
                  <span
                    style={{
                      marginLeft: "auto",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background: "#e5e7eb",
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    {post.weather}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
