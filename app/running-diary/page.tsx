// app/run-diary/page.tsx
"use client";

import { useEffect, useState } from "react";

type RunLog = {
  id: number;
  run_date: string;      // "2025-11-26"
  distance_km: number;
  mood: string | null;
  weather: string | null;
  created_at: string;
};

export default function RunDiaryPage() {
  const [runDate, setRunDate] = useState<string>(() => {
    // 默认今天
    const today = new Date();
    return today.toISOString().slice(0, 10); // YYYY-MM-DD
  });
  const [distanceKm, setDistanceKm] = useState<string>("");
  const [mood, setMood] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [logs, setLogs] = useState<RunLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 页面加载时拉一次列表
  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await fetch("/api/run-logs");
      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || "加载跑步日志失败");
        return;
      }

      setLogs(json);
    } catch (e: any) {
      console.error(e);
      setErrorMsg("网络好像出了点问题");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!runDate || !distanceKm) {
      setErrorMsg("日期和公里数是必填的哟～");
      return;
    }

    const distance = Number(distanceKm);
    if (Number.isNaN(distance) || distance <= 0) {
      setErrorMsg("请输入正确的公里数（大于 0）");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg(null);

      const res = await fetch("/api/run-logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          run_date: runDate,
          distance_km: distance,
          mood: mood.trim() || null,
          weather: weather.trim() || null,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error || "保存失败了，再试一次？");
        return;
      }

      // 清空部分字段，日期保留
      setDistanceKm("");
      // mood 和 weather 你可以选择清空或保留，这里保留方便写连续几天
      // setMood("");
      // setWeather("");

      // 把新记录插到最前面
      setLogs((prev) => [json, ...prev]);
    } catch (e: any) {
      console.error(e);
      setErrorMsg("网络好像出了点问题");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12 bg-[#f7f4ef]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          跑步日报 · 记录今天的自己
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          每天写下跑量、心情和天气，让你的跑步系统和小红书内容互相喂养 💛
        </p>

        {/* 错误提示 */}
        {errorMsg && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMsg}
          </div>
        )}

        {/* 表单 */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 rounded-2xl border border-gray-200 bg-white/80 p-4 md:p-6 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 日期 */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                日期
              </label>
              <input
                type="date"
                value={runDate}
                onChange={(e) => setRunDate(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 bg-white/80"
              />
            </div>

            {/* 距离 */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                距离（km）
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                placeholder="例如 5 或 10.5"
                value={distanceKm}
                onChange={(e) => setDistanceKm(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 bg-white/80"
              />
            </div>
          </div>

          {/* 心情 */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">
              今天的心情（可选）
            </label>
            <textarea
              rows={2}
              placeholder="例如：配速不快，但整个人很松弛、很舒服。"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 bg-white/80"
            />
          </div>

          {/* 天气 */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">
              天气（可选）
            </label>
            <input
              type="text"
              placeholder="例如：阴天 15℃、微风，很适合跑步"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 bg-white/80"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium text-white bg-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "保存中…" : "保存今天的跑步"}
            </button>
          </div>
        </form>

        {/* 日志列表 */}
        <section>
          <h2 className="text-lg font-semibold mb-3">最近的跑步记录</h2>

          {loading ? (
            <p className="text-sm text-gray-500">加载中…</p>
          ) : logs.length === 0 ? (
            <p className="text-sm text-gray-500">
              还没有记录，先写下第一条吧 😊
            </p>
          ) : (
            <ul className="space-y-3">
              {logs.map((log) => (
                <li
                  key={log.id}
                  className="rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-sm shadow-sm"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">
                      {log.run_date} · {log.distance_km} km
                    </span>
                    <span className="text-[11px] text-gray-400">
                      记录于 {new Date(log.created_at).toLocaleString()}
                    </span>
                  </div>

                  {log.mood && (
                    <p className="text-gray-700 mb-1">
                      <span className="text-gray-500 mr-1">心情：</span>
                      {log.mood}
                    </p>
                  )}

                  {log.weather && (
                    <p className="text-gray-700">
                      <span className="text-gray-500 mr-1">天气：</span>
                      {log.weather}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
