"use client";

import { useState } from "react";

// 每一条跑步记录的类型
type Run = {
  id: number;
  date: string;
  distance: number;
  note: string;
  moodEmoji: string; // 新增：心情 emoji
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
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold">
                    {run.distance} km
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {run.date}
                  </p>
                </div>

                {run.note && (
                  <p className="mt-1 text-xs text-gray-700">
                    {run.note}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
