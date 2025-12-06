"use client";

import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 读取列表
  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (e: any) {
      setError(e?.message || "加载失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !content || !author) {
      setError("标题、内容、作者 都不能为空");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, author }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "提交失败");
        return;
      }

      // 提交成功：清空表单 + 重新加载列表
      setTitle("");
      setContent("");
      setAuthor("");
      await loadPosts();
    } catch (e: any) {
      setError(e?.message || "提交失败");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-2">小小发帖系统（Supabase版）</h1>

      {/* 发帖表单 */}
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-1">标题</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="写一个标题，比如：今天和 Next.js 又更熟了一点"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">内容</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[100px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="记录一下今天的感受、学习或者跑步心得..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">作者</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="比如：蔡蔡"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded bg-black text-white text-sm disabled:opacity-60"
        >
          {submitting ? "发布中..." : "发布"}
        </button>
      </form>

      {/* 分割线 */}
      <hr />

      {/* 列表显示 */}
      <div className="space-y-3">
        {loading && <p>加载中...</p>}

        {!loading && posts.length === 0 && <p>目前还没有任何帖子，先发一条试试吧～</p>}

        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded p-4 shadow-sm bg-white space-y-2"
          >
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            <div className="text-xs text-gray-500">
              ✍️ 作者：{post.author} · 🕒{" "}
              {new Date(post.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
