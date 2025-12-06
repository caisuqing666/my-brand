"use client";

import { useEffect, useState } from "react";

type Post = {
  id: number;
  title?: string;
  content?: string | null;
};

export default function SupabaseTest() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/posts?select=*`;

        const res = await fetch(url, {
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }

        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || "未知错误");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>正在从 Supabase 读取数据...</p>;
  }

  if (error) {
    return (
      <div
        style={{
          marginTop: 24,
          padding: 12,
          border: "1px solid #f99",
          borderRadius: 8,
          background: "#fff5f5",
        }}
      >
        <h3>❌ Supabase 连接出错</h3>
        <p style={{ whiteSpace: "pre-wrap" }}>{error}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: 24,
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2>🧪 Supabase 连接测试（posts 表）</h2>

      {posts.length === 0 ? (
        <p>目前 posts 表是空的。</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title || `帖子 #${post.id}`}</strong>
              {post.content ? ` —— ${post.content}` : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
