"use client";

import { useState } from "react";

type RunEntry = {
  id: number;
  date: string; // 跑步日期（YYYY-MM-DD）
  distanceKm: number; // 距离（公里）
  feeling: string; // 跑完的感受
  isDone: boolean; // 是否完成/已打卡
  createdAt: string; // 记录创建时间
};

type SortMode = "latest" | "oldest" | "distanceDesc";

export default function RunLogPage() {
  const [date, setDate] = useState("");
  const [distanceKm, setDistanceKm] = useState("");
  const [feeling, setFeeling] = useState("");
  const [entries, setEntries] = useState<RunEntry[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>("latest");

  // 新增一条跑步记录
  const handleAdd = () => {
    const trimmedFeeling = feeling.trim();
    const trimmedDate = date.trim();
    const distanceNumber = Number(distanceKm);

    if (!trimmedDate || !trimmedFeeling || !distanceNumber || distanceNumber <= 0) {
      // 简单防呆：不合法就不处理
      return;
    }

    const now = Date.now();

    const newEntry: RunEntry = {
      id: now,
      date: trimmedDate,
      distanceKm: distanceNumber,
      feeling: trimmedFeeling,
      isDone: false,
      createdAt: new Date().toLocaleString(),
    };

    setEntries((prev) => [newEntry, ...prev]);

    // 清空部分输入，日期可以保留，方便一次录多次
    setDistanceKm("");
    setFeeling("");
  };

  // 删除一条记录
  const handleDelete = (id: number) => {
    setEntries((prev) => prev.filter((item) => item.id !== id));
  };

  // 切换是否完成
  const toggleDone = (id: number) => {
    setEntries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  // ====== 本月统计：总公里数 ======
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 0-11 → 1-12
  const currentMonthLabel = `${currentYear}年${String(currentMonth).padStart(
    2,
    "0"
  )}月`;

// 把 "YYYY-MM-DD" 解析成本地日期对象（避免时区问题）
const parseDateStr = (dateStr: string) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
};


  // 过滤出“本月”的跑步记录
  const monthlyRuns = entries.filter((entry) => {
    if (!entry.date) return false;
    const [y, m] = entry.date.split("-").map(Number);
    return y === currentYear && m === currentMonth;
  });

// 本月跑步天数（日期去重）
const monthlyRunDays = new Set(
  monthlyRuns.map((item) => item.date)
).size;


// 本月最长一次（最大距离）
const monthlyLongest = monthlyRuns.length > 0
  ? Math.max(...monthlyRuns.map((item) => item.distanceKm))
  : 0;

// 找到对应的那一天
const longestRunEntry = monthlyRuns.find(
  (item) => item.distanceKm === monthlyLongest
);


  // 本月总里程
  const monthlyTotalKm = monthlyRuns.reduce(
    (sum, item) => sum + item.distanceKm,
    0
  );

// 本月跑步次数
const monthlyRunCount = monthlyRuns.length;

// 本月平均每次公里数（保留一位小数）
const monthlyAvgKm =
  monthlyRunCount > 0
    ? (monthlyTotalKm / monthlyRunCount).toFixed(1)
    : "0.0";

// 本月最长连续跑步天数（streak）
let monthlyLongestStreak = 0;

// 按日期升序排好，用来画图
const monthlyRunsSortedByDate = [...monthlyRuns].sort((a, b) => {
  const da = parseDateStr(a.date).getTime();
  const db = parseDateStr(b.date).getTime();
  return da - db;
});

// 本月最大单次距离，用来确定柱状图的高度比例
const maxDistanceInMonth =
  monthlyRunsSortedByDate.length > 0
    ? Math.max(...monthlyRunsSortedByDate.map((item) => item.distanceKm))
    : 0;


if (monthlyRuns.length > 0) {
  // 1. 先把本月所有“日期”去重
  const uniqueDates = Array.from(
    new Set(monthlyRuns.map((item) => item.date))
  ).sort((a, b) => {
    const da = parseDateStr(a).getTime();
    const db = parseDateStr(b).getTime();
    return da - db;
  });

  // 2. 顺着这些日期，一天一天检查是否是连续的
  let currentStreak = 0;
  let prevDate: Date | null = null;

  uniqueDates.forEach((dateStr) => {
    const d = parseDateStr(dateStr);
    if (!prevDate) {
      currentStreak = 1;
    } else {
      const diffDays =
        (d.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        // 连着的下一天
        currentStreak += 1;
      } else {
        // 断档了，从 1 重新开始
        currentStreak = 1;
      }
    }

    if (currentStreak > monthlyLongestStreak) {
      monthlyLongestStreak = currentStreak;
    }

    prevDate = d;
  });
}


  // ====== 列表排序（不变）======
  const sortedEntries = [...entries].sort((a, b) => {
    if (sortMode === "latest") {
      // 最新在前
      return b.id - a.id;
    }
    if (sortMode === "oldest") {
      // 最旧在前
      return a.id - b.id;
    }
    if (sortMode === "distanceDesc") {
      // 按距离从长到短
      return b.distanceKm - a.distanceKm;
    }
    return 0;
  });

  return (
    <div
      style={{
        padding: 24,
        fontSize: 18,
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      <h1>🏃‍♀️ 跑步日记 · 原型 1.1</h1>
      <p style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>
        记录每一次出发，也记录每一次接住自己的过程。
      </p>

      {/* 本月统计卡片 */}
      <div
  style={{
    marginTop: 12,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#f8f7ff",
    border: "1px solid #eee",
    fontSize: 16,
  }}
>
  <div>
    📅 {currentMonthLabel} · 本月总里程：
    <strong>{monthlyTotalKm.toFixed(1)}</strong> 公里
  </div>
  <div style={{ marginTop: 6 }}>
    🏃‍♀️ 本月跑步次数：<strong>{monthlyRunCount}</strong> 次
  </div>
  <div style={{ marginTop: 6 }}>
    📊 平均每次：<strong>{monthlyAvgKm}</strong> 公里
  </div>
  <div style={{ marginTop: 6 }}>
  🥇 本月最长一次：
  <strong>{monthlyLongest.toFixed(1)}</strong> 公里
  {longestRunEntry && (
    <span style={{ fontSize: 12, marginLeft: 6 }}>
      （{longestRunEntry.date}）
    </span>
  )}
</div>
<div style={{ marginTop: 6 }}>
  🏃‍♀️ 本月跑步天数：<strong>{monthlyRunDays}</strong> 天
</div>
<div style={{ marginTop: 6 }}>
    🔗 本月最长连续跑步：
    <strong>{monthlyLongestStreak}</strong> 天
  </div>

</div>

      {/* 本月跑量小图表 */}
      <div
        style={{
          marginTop: 4,
          marginBottom: 16,
          padding: 12,
          borderRadius: 12,
          backgroundColor: "#faf9ff",
          border: "1px solid #f0f0ff",
          fontSize: 14,
        }}
      >
        <div
          style={{
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>📈 本月跑量小图</span>
          <span style={{ opacity: 0.7, fontSize: 12 }}>
            每一柱代表某一天的总公里数
          </span>
        </div>

        {monthlyRunsSortedByDate.length === 0 ? (
          <p style={{ fontSize: 14, opacity: 0.8 }}>
            本月还没有任何跑步记录，等你第一次出门的那天，这里就会亮起来。
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              height: 160,
              padding: "4px 0",
            }}
          >
            {monthlyRunsSortedByDate.map((entry) => {
              const ratio =
                maxDistanceInMonth > 0
                  ? entry.distanceKm / maxDistanceInMonth
                  : 0;
              const barHeight = `${Math.max(ratio * 100, 8)}%`; // 至少有一点高度

              return (
                <div
  key={entry.date}
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: "0 0 32px",
    height: "100%",          // ⭐ 关键：这一行
  }}
>


                  <div
                    style={{
                      width: "100%",
                      borderRadius: 999,
                      backgroundImage:
                        "linear-gradient(to top, #9fa3ff, #c8caff)",
                      height: barHeight,
                      transition: "height 0.3s",
                    }}
                  ></div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 10,
                      opacity: 0.8,
                      textAlign: "center",
                    }}
                  >
                    {entry.date.slice(5)}{/* 只显示 MM-DD */}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      opacity: 0.85,
                      textAlign: "center",
                    }}
                  >
                    {entry.distanceKm
                      .toFixed(1)
                      .replace(/\.0$/, "")}
                    k
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>


      {/* 输入区域 */}
      <div
        style={{
          marginTop: 8,
          marginBottom: 16,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 14, marginBottom: 4 }}>日期</div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              padding: 6,
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <div style={{ fontSize: 14, marginBottom: 4 }}>距离（公里）</div>
          <input
            type="number"
            min="0"
            step="0.1"
            value={distanceKm}
            onChange={(e) => setDistanceKm(e.target.value)}
            placeholder="例如：5 或 10"
            style={{
              padding: 6,
              borderRadius: 8,
              border: "1px solid #ccc",
              width: 120,
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 14, marginBottom: 4 }}>跑完的感受</div>
          <input
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            placeholder="写一句给今天跑完的自己"
            style={{
              padding: 6,
              borderRadius: 8,
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>

        <button
          onClick={handleAdd}
          style={{
            padding: "10px 18px",
            borderRadius: 10,
            border: "none",
            backgroundColor: "#7b7fff",
            color: "white",
            fontSize: 14,
            cursor: "pointer",
            marginTop: 22,
          }}
        >
          保存记录
        </button>
      </div>

      <hr style={{ margin: "16px 0" }} />

      {/* 标题 + 排序控制 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <h2 style={{ fontSize: 18, margin: 0 }}>📒 我的跑步记录</h2>

        <div style={{ fontSize: 14 }}>
          排序：
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            style={{
              marginLeft: 4,
              padding: "2px 6px",
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: 14,
            }}
          >
            <option value="latest">按时间：最新在前</option>
            <option value="oldest">按时间：最旧在前</option>
            <option value="distanceDesc">按距离：从长到短</option>
          </select>
        </div>
      </div>

      {/* 列表区域 */}
      {sortedEntries.length === 0 ? (
        <p style={{ fontSize: 16 }}>
          还没有任何跑步记录，  
          从第一次跑开始，也是一种温柔的重新出发。
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {sortedEntries.map((entry) => (
            <li
              key={entry.id}
              style={{
                border: "1px solid #eee",
                borderRadius: 12,
                padding: 12,
                marginBottom: 12,
                fontSize: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span>
                  📅 {entry.date} ｜ 🧵{" "}
                  {entry.distanceKm.toFixed(1).replace(/\.0$/, "")} km
                </span>
                <span
                  style={{
                    fontSize: 12,
                    opacity: 0.7,
                  }}
                >
                  记录时间：{entry.createdAt}
                </span>
              </div>

              <div
                style={{
                  marginTop: 4,
                  textDecoration: entry.isDone ? "line-through" : "none",
                  opacity: entry.isDone ? 0.6 : 1,
                }}
              >
                💭 {entry.feeling}
                {entry.isDone && (
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 12,
                    }}
                  >
                    ✅ 已完成
                  </span>
                )}
              </div>

              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => toggleDone(entry.id)}
                  style={{
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 10px",
                    backgroundColor: "#f0f0ff",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  {entry.isDone ? "取消完成" : "标记完成"}
                </button>

                <button
                  onClick={() => handleDelete(entry.id)}
                  style={{
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 10px",
                    backgroundColor: "#f5f5f5",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  删除
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

