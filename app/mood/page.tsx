"use client";

import { useState } from "react";
import { MoodPreview } from "./MoodPreview";
import { MoodResult } from "./MoodResult";

type MoodEntry = {
  id: number;
  mood: string;
  createdAt: string;
  isEditing: boolean;
  isDone: boolean;
};

type SortMode = "latest" | "oldest" | "undoneFirst";

export default function MoodPage() {
  const [mood, setMood] = useState(""); // 输入框里的内容
  const [displayMood, setDisplayMood] = useState(""); // 顶部展示的心情
  const [entries, setEntries] = useState<MoodEntry[]>([]); // 心情日记列表
  const [sortMode, setSortMode] = useState<SortMode>("latest"); // 排序方式

  // 新增一条心情
  const handleSubmit = () => {
    const trimmed = mood.trim();
    if (!trimmed) return;

    setDisplayMood(trimmed);

    const newEntry: MoodEntry = {
      id: Date.now(), // 用时间戳作为唯一 id
      mood: trimmed,
      createdAt: new Date().toLocaleString(),
      isEditing: false,
      isDone: false,
    };

    setEntries((prev) => [newEntry, ...prev]);
    setMood("");
  };

  // 删除某一条
  const handleDelete = (id: number) => {
    setEntries((prev) => prev.filter((item) => item.id !== id));
  };

  // 根据 sortMode 得到排序后的列表
  const sortedEntries = [...entries].sort((a, b) => {
    if (sortMode === "latest") {
      // 最新在前：id 大的在上面
      return b.id - a.id;
    }
    if (sortMode === "oldest") {
      // 最旧在前：id 小的在上面
      return a.id - b.id;
    }
    if (sortMode === "undoneFirst") {
      // 未接住在前，已接住在后；同一状态按时间降序
      if (a.isDone !== b.isDone) {
        return a.isDone ? 1 : -1;
      }
      return b.id - a.id;
    }
    return 0;
  });

  return (
    <div
      style={{
        padding: 24,
        fontSize: 20,
        maxWidth: 640,
        margin: "0 auto",
      }}
    >
      <h1>🌤️ 今天的心情记录</h1>

      {/* 输入区域 */}
      <div style={{ marginTop: 16, marginBottom: 8 }}>
        <input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="输入你的心情..."
          style={{
            padding: 8,
            border: "1px solid #ccc",
            borderRadius: 8,
            width: 260,
            marginRight: 12,
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#7b7fff",
            color: "white",
            cursor: "pointer",
          }}
        >
          保存心情
        </button>
      </div>

      {/* 实时预览 */}
      <MoodPreview mood={mood} />

      {/* 最终心情 */}
      <MoodResult mood={displayMood} />

      <hr style={{ margin: "24px 0" }} />

      {/* 心情日记列表 + 排序控制 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <h2 style={{ fontSize: 18, margin: 0 }}>📝 心情小日记</h2>

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
            <option value="undoneFirst">按状态：未接住在前</option>
          </select>
        </div>
      </div>

      {sortedEntries.length === 0 ? (
        <p style={{ fontSize: 16 }}>还没有记录，写下今天的第一条心情吧～</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {sortedEntries.map((entry, index) => (
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
              {/* 编辑模式 or 展示模式 */}
              {entry.isEditing ? (
                <div style={{ marginTop: 4 }}>
                  <input
                    defaultValue={entry.mood}
                    onChange={(e) =>
                      setEntries((prev) =>
                        prev.map((item) =>
                          item.id === entry.id
                            ? { ...item, mood: e.target.value }
                            : item
                        )
                      )
                    }
                    style={{
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      marginRight: 8,
                    }}
                  />
                  <button
                    onClick={() =>
                      setEntries((prev) =>
                        prev.map((item) =>
                          item.id === entry.id
                            ? { ...item, isEditing: false }
                            : item
                        )
                      )
                    }
                    style={{
                      padding: "4px 8px",
                      borderRadius: 6,
                      border: "none",
                      backgroundColor: "#c2f0c2",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    保存
                  </button>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      marginBottom: 4,
                      textDecoration: entry.isDone ? "line-through" : "none",
                      opacity: entry.isDone ? 0.6 : 1,
                    }}
                  >
                    <strong>心情：</strong>
                    {entry.mood}
                    {entry.isDone && (
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: 12,
                        }}
                      >
                        ✅ 已接住
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      opacity: entry.isDone ? 0.5 : 0.7,
                    }}
                  >
                    {entry.createdAt}
                  </div>
                </>
              )}

              {/* 按钮区 */}
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => handleDelete(entry.id)}
                  style={{
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 8px",
                    backgroundColor: "#f5f5f5",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  删除
                </button>

                <button
                  onClick={() =>
                    setEntries((prev) =>
                      prev.map((item) =>
                        item.id === entry.id
                          ? { ...item, isEditing: true }
                          : item
                      )
                    )
                  }
                  style={{
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 8px",
                    backgroundColor: "#eef",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  编辑
                </button>

                <button
                  onClick={() =>
                    setEntries((prev) =>
                      prev.map((item) =>
                        item.id === entry.id
                          ? { ...item, isDone: !item.isDone }
                          : item
                      )
                    )
                  }
                  style={{
                    border: "none",
                    borderRadius: 8,
                    padding: "4px 8px",
                    backgroundColor: "#f0f0ff",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  {entry.isDone ? "取消标记" : "标记已接住"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
