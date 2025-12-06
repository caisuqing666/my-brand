// components/RunTrack.tsx

"use client";

import { useState } from "react";

// 每一条跑步记录的类型
type Run = {
  id: number;
  date: string;      // YYYY-MM-DD
  distance: number;  // km
  note: string;
  moodEmoji: string; // 心情 emoji
};

// 迷你跑步记录系统（本地小练习版，不连数据库）
export default function RunTracker() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const [date, setDate] = useState(today);
  const [distance, setDistance] = useState("");
  const [note, setNote] = useState("");
  const [moodEmoji, setMoodEmoji] = useState("🏃‍♀️"); // 默认给一个跑步小人
  const [runs, setRuns] = useState<Run[]>([]);

  const addRun = () => {
    if (!date || !distance) {
      alert("日期和距离是必填的哦～");
      return;
    }

    const distanceNum = Number(distance);
    if (Number.isNaN(distanceNum) || distanceNum <= 0) {
      alert("请填写正确的跑步距离（大于 0）");
      return;
    }

    const newRun: Run = {
      id: Date.now(),
      date,
      distance: distanceNum,
      note,
      moodEmoji,
    };

    // 把新纪录加到列表前面
    setRuns((prev) => [newRun, ...prev]);

    // 清空一下输入框，日期保留今天方便继续记
    setDistance("");
    setNote("");
    setMoodEmoji("🏃‍♀️");
  };

  // === 统计区域：本月里程 / 今年里程 / 最常见 emoji ===
  const todayDate = new Date();
  const currentYear = todayDate.getFullYear();
  const currentMonth = todayDate.getMonth(); // 0-11

  let monthDistance = 0;
  let yearDistance = 0;
  const emojiCount: Record<string, number> = {};

  for (const run of runs) {
    const d = new Date(run.date);
    if (!Number.isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = d.getMonth();

      // 今年里程
      if (y === currentYear) {
        yearDistance += run.distance;

        // 本月里程
        if (m === currentMonth) {
          monthDistance += run.distance;
        }
      }
    }

    // 统计 emoji 次数
    if (run.moodEmoji) {
      emojiCount[run.moodEmoji] = (emojiCount[run.moodEmoji] || 0) + 1;
    }
  }

  // 找出出现次数最多的 emoji
  let mostUsedEmoji = "";
  let mostUsedCount = 0;
  for (const [emoji, count] of Object.entries(emojiCount)) {
    if (count > mostUsedCount) {
      mostUsedEmoji = emoji;
      mostUsedCount = count;
    }
  }

  const hasStats = runs.length > 0;

  return (
    <div className="space-y-4">
      {/* 输入区 */}
      <div className="p-4 border rounded-2xl bg-white/90 shadow-sm space-y-3">
        <h2 className="text-base font-semibold">迷你跑步记录 🏃‍♀️</h2>

        {/* 日期 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">日期</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
          />
        </div>

        {/* 距离 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">距离（km）</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
            placeholder="例如 5.2"
          />
        </div>

        {/* 心情 emoji 选择 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">今天的跑步心情</label>
          <select
            value={moodEmoji}
            onChange={(e) => setMoodEmoji(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
          >
            <option value="🏃‍♀️">🏃‍♀️ 认真完成的一次跑</option>
            <option value="😊">😊 轻松愉快</option>
            <option value="😌">😌 放松舒缓</option>
            <option value="🤯">🤯 压力释放</option>
            <option value="😭">😭 有点累但坚持住了</option>
            <option value="🌧️">🌧️ 雨天里的特别记忆</option>
          </select>
        </div>

        {/* 备注 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">一句小记（可写情绪 / 故事）</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm"
            rows={2}
            placeholder="例如：今天在河边跑步，风很舒服。"
          />
        </div>

        <button
          onClick={addRun}
          className="mt-2 w-full rounded-xl px-3 py-2 text-sm font-semibold border bg-black text-white hover:bg-black/80 transition"
        >
          记录这一次跑步
        </button>
      </div>

      {/* 统计区：本月 / 今年 / emoji */}
      <div className="p-4 border rounded-2xl bg-white/85 shadow-sm space-y-2">
        <h3 className="text-sm font-medium text-slate-800">
          📊 小小统计（本地版）
        </h3>

        {hasStats ? (
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="space-y-1">
              <p className="text-xs text-slate-500">本月里程</p>
              <p className="text-sm font-semibold text-slate-900">
                {monthDistance.toFixed(1)} km
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">今年里程</p>
              <p className="text-sm font-semibold text-slate-900">
                {yearDistance.toFixed(1)} km
              </p>
            </div>
            <div className="space-y-1">
            <p
  className="text-[11px] text-[#9C8577]"
  style={{
    letterSpacing: "0.3px",
    opacity: 0.85
  }}
>
  心情：
</p>

              <p className="text-lg">{mostUsedEmoji || "🌱"}</p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500">
            还没有统计数据。先记录一两次跑步，这里就会自动出现你的本月里程 /
            今年里程和最近常见的心情。
          </p>
        )}
      </div>
  
      {/* 列表区 */}
      <div className="space-y-3">
  {runs.length === 0 ? (
    <p className="text-sm text-gray-500">
      还没有记录。要不要先用上面记一小段今天的跑步？🌿
    </p>
  ) : (
    runs.map((run) => (
      <div
        key={run.id}
        className="flex items-start gap-3 p-3 border rounded-2xl bg-white/90 shadow-sm"
      >
        {/* 左侧 emoji */}
        <div className="text-3xl leading-none">{run.moodEmoji}</div>

        {/* 右侧信息 */}
        <div className="flex-1 relative space-y-1.5">
          {/* 右上角小标记 ✦ */}
          <span
            className="absolute top-1 right-1 text-[#C7B8A4]"
            style={{
              fontSize: "12px",
              opacity: 0.55,
              fontFamily: "serif",
            }}
          >
            ✦
          </span>

          {/* 第一行：距离 + 日期 */}
          <div className="flex items-baseline justify-between gap-2">
            {/* 距离：小标题风 */}
            <p
              className="text-sm md:text-base font-semibold text-[#6F5B50]"
              style={{
                fontFamily: "serif",
                letterSpacing: "0.5px",
              }}
            >
              {run.distance} km
            </p>

            {/* 日期：手帐风小字 */}
            <p
              className="text-[11px] text-[#7A6A5F]"
              style={{
                fontFamily: "serif",
                letterSpacing: "0.5px",
                opacity: 0.8,
              }}
            >
              {run.date}
            </p>
          </div>

          {/* 第二行：心情 emoji 显示 */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
            <span>
              <span
                className="text-[#9C8577]"
                style={{
                  letterSpacing: "0.3px",
                  opacity: 0.85,
                }}
              >
                心情：
              </span>
              <span className="text-gray-700 ml-0.5">{run.moodEmoji}</span>
            </span>
          </div>

          {/* 备注 / 笔记 */}
          {run.note && (
            <p className="text-xs text-gray-700">{run.note}</p>
          )}
        </div>
      </div>
    ))
  )}
</div>


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
  );
}
