"use client";

import React, { useEffect, useState } from "react";

type RunDiaryItem = {
  id: number;
  run_date: string;
  distance_km: number;
  mood: string | null;
  weather: string | null;
  created_at: string;
};

export default function RunDiaryPage() {
  const [runs, setRuns] = useState<RunDiaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 表单字段
  const [runDate, setRunDate] = useState("");
  const [distanceKm, setDistanceKm] = useState("");
  const [mood, setMood] = useState("");
  const [weather, setWeather] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  // 读取记录
  async function fetchRuns() {
    try {
      setLoading(true);
      const res = await fetch("/api/run-diary");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "加载失败");
      }

      setRuns(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "加载失败";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRuns();
  }, []);

  // 新增记录
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/run-diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          run_date: runDate,
          distance_km: Number(distanceKm),
          mood,
          weather,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "保存失败");
      }

      // 表单清空
      setRunDate("");
      setDistanceKm("");
      setMood("");
      setWeather("");

      // 刷新本地列表：把新记录插到最前面
      setRuns((prev) => [data, ...prev]);

      setError(null);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "保存失败";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  // 本月总里程
  // 当前年月
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1 ~ 12
  const defaultMonthKey = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;

  // 当前生效的月份：有选下拉框就用选的，没有就用当前月
  const activeMonthKey = selectedMonth || defaultMonthKey;

  // 计算「当前生效月份」的总里程
  const activeMonthTotal = runs
    .filter((item) => {
      if (!item.run_date) return false;
      // run_date 形如 2025-10-01，只要前 7 位等于 2025-10
      return item.run_date.startsWith(activeMonthKey);
    })
    .reduce((sum, item) => sum + Number(item.distance_km || 0), 0);

// 今年累计里程（按当前年份）
const yearTotal = runs
  .filter((item) => {
    if (!item.run_date) return false;
    // run_date 形如 2025-10-03，用年份开头判断是否属于今年
    return item.run_date.startsWith(String(currentYear));
  })
  .reduce((sum, item) => sum + Number(item.distance_km || 0), 0);


  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* 顶部标题区 */}
        <header className="space-y-3">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-500 shadow-sm">
            INFJ 跑者 · 个人跑步系统
          </div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
            跑步日记 🏃‍♀️
          </h1>
          <p className="text-sm leading-relaxed text-slate-600 max-w-2xl">
            把每一次出门跑步的里程、心情和天气，慢慢记下来。<br />
            今天写下的，是未来某一天回头看时很温柔的一页。
          </p>
        </header>
  
        {/* 统计区域：月度 + 年度 */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500 mb-1">当前筛选月份</p>
            <p className="text-sm font-medium text-slate-800 mb-1">
              {activeMonthKey}
            </p>
            <p className="text-xs text-slate-500">本月累计里程</p>
            <p className="text-2xl font-semibold text-slate-900">
              {activeMonthTotal.toFixed(1)} <span className="text-xs">km</span>
            </p>
          </div>
  
          <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500 mb-1">年度概览</p>
            <p className="text-sm font-medium text-slate-800 mb-1">
              {currentYear} 年累计里程
            </p>
            <p className="text-2xl font-semibold text-slate-900">
              {yearTotal.toFixed(1)} <span className="text-xs">km</span>
            </p>
            <p className="mt-1 text-xs text-slate-500">
              一点一滴，都是在为未来的自己打底。
            </p>
          </div>
        </section>
  
        {/* 筛选 + 表单整体卡片 */}
        <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm space-y-5">
          {/* 月份筛选 */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">
              筛选月份
            </label>
            <select
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">当前月份（{activeMonthKey}）</option>
              {Array.from(
                new Set(runs.map((r) => r.run_date.slice(0, 7)))
              ).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-400">
              选择某个月，只看那个月的跑步记录；不选则默认按当前月份。
            </p>
          </div>
  
          {/* 新增记录表单 */}
          <div className="border-t border-dashed border-slate-200 pt-4 space-y-3">
            <h2 className="text-sm font-medium text-slate-800">
              新增一条跑步记录
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="text-xs space-y-1">
                  <span className="text-slate-600">日期</span>
                  <input
                    type="date"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
                    value={runDate}
                    onChange={(e) => setRunDate(e.target.value)}
                    required
                  />
                </label>
  
                <label className="text-xs space-y-1">
                  <span className="text-slate-600">里程（km）</span>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(e.target.value)}
                    required
                  />
                </label>
              </div>
  
              <label className="text-xs space-y-1 block">
                <span className="text-slate-600">心情 / 备注</span>
                <input
                  type="text"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
                  placeholder="比如：今天状态比预期好一点点。"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                />
              </label>
  
              <label className="text-xs space-y-1 block">
                <span className="text-slate-600">天气</span>
                <input
                  type="text"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
                  placeholder="阴天 / 晴天 / 小雨 …"
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                />
              </label>
  
              {error && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  ⚠️ {error}
                </p>
              )}
  
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-900 bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-sm disabled:opacity-60"
                >
                  {submitting ? "保存中…" : "保存跑步记录"}
                </button>
              </div>
            </form>
          </div>
        </section>
  
        {/* 历史记录列表 */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">
              历史记录
            </h2>
            <span className="text-xs text-slate-400">
              共 {runs.length} 条记录
            </span>
          </div>
  
          {loading && (
            <p className="text-xs text-slate-500">加载中…</p>
          )}
  
          {!loading && runs.length === 0 && (
            <p className="text-xs text-slate-500">
              还没有任何记录，可以先写下今天的一小段跑步～
            </p>
          )}
  
          <div className="space-y-3">
            {runs
              .filter((item) => {
                if (!selectedMonth) return true;
                return item.run_date.startsWith(selectedMonth);
              })
              .map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm"
                >
                  <div className="flex justify-between items-baseline gap-2">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-slate-900">
                        {item.run_date} · {item.distance_km} km
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
                        {item.weather && (
                          <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 border border-slate-200">
                            天气：{item.weather}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      记录于{" "}
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>
  
                  {item.mood && (
                    <p className="mt-2 text-xs leading-relaxed text-slate-700">
                      心情记一笔：{item.mood}
                    </p>
                  )}
                </article>
              ))}
          </div>
        </section>

        {/* 底部文字 */}
        <div className="w-full text-center py-6">
          <p
            className="text-xs md:text-sm text-[#9C8577]"
            style={{
              fontFamily: "serif",
              opacity: 0.6,
              letterSpacing: "0.3px"
            }}
          >
            每一次跑步，都是和自己的小会面。
          </p>
        </div>
      </div>
    </main>
  );
}