// app/coding/page.tsx

"use client";

import Link from "next/link";
import { useState } from "react";

type LearningLog = {
  id: number;
  date: string;
  topic: string;
  note: string;
};

export default function CodingPage() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const [date, setDate] = useState(today);
  const [topic, setTopic] = useState("");
  const [note, setNote] = useState("");
  const [logs, setLogs] = useState<LearningLog[]>([]);

  const addLog = () => {
    if (!topic.trim()) {
      alert("至少写一个今天学习的主题呀～");
      return;
    }

    const newLog: LearningLog = {
      id: Date.now(),
      date,
      topic: topic.trim(),
      note: note.trim(),
    };

    // 新记录插到最前面
    setLogs((prev) => [newLog, ...prev]);

    // 清空输入，但保留日期（默认今天）
    setTopic("");
    setNote("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdfaf5] via-[#f8f1e8] to-[#f3e8dd]">
      <div className="max-w-2xl mx-auto px-5 py-8 space-y-8">
        {/* 顶部导航 */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:underline inline-flex items-center gap-1"
          >
            <span>←</span>
            <span>返回首页</span>
          </Link>

          <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] text-amber-700">
            INFJ · 编程小宇宙
          </div>
        </div>

        {/* 标题区 */}
        <section className="space-y-3">
          <h1 className="text-xl font-semibold text-slate-900">
            💻 编程 · 网站学习记录
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            这里不是为了“变厉害”，
            而是轻轻地记下：你在 Next.js / Supabase / 前端世界里的每一次小小进步。
            一行两行就很好，是给未来的自己看的脚注。
          </p>
        </section>

        {/* 输入区 */}
        <section className="space-y-3 rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
          <h2 className="text-sm font-medium text-slate-800 flex items-center gap-2">
            <span>✏️ 记录今天的学习</span>
            <span className="text-[11px] text-slate-400">
              不需要很长，真诚就好
            </span>
          </h2>

          {/* 日期 */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-600">日期</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-lg px-2 py-1 text-sm bg-white/80 focus:outline-none focus:ring-1 focus:ring-amber-300"
            />
          </div>

          {/* 学习主题 */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-600">
              今天学了什么？（主题）
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border rounded-lg px-2 py-1 text-sm bg-white/80 focus:outline-none focus:ring-1 focus:ring-amber-300"
              placeholder="例如：把跑步系统独立成 /run-tracker 页面"
            />
          </div>

          {/* 一句小记 */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-600">
              一句小总结 / 感受（可选）
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border rounded-lg px-2 py-1 text-sm bg-white/80 focus:outline-none focus:ring-1 focus:ring-amber-300"
              rows={2}
              placeholder="例如：今天终于分清了组件和页面，网站开始有结构了。"
            />
          </div>

          <button
            onClick={addLog}
            className="mt-1 w-full rounded-xl px-3 py-2 text-sm font-semibold border bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            记录这一次小小进步
          </button>
        </section>

        {/* 列表区 */}
        <section className="space-y-3 pb-6">
          <h2 className="text-sm font-medium text-slate-800">
            📘 我的学习足迹
          </h2>

          {logs.length === 0 ? (
            <p className="text-xs text-slate-500 leading-relaxed">
              目前还没有记录。可以先写下今天的一点点，
              比如：“让首页长成‘家’的样子”。这些都会变成未来你很喜欢回看的东西。🌿
            </p>
          ) : (
            <div className="space-y-2">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-2xl border border-slate-100 bg-white/90 p-3 shadow-sm"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[11px] text-slate-500">{log.date}</p>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {log.topic}
                  </p>
                  {log.note && (
                    <p className="mt-1 text-xs text-slate-700 leading-relaxed">
                      {log.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

