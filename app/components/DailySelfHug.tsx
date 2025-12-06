"use client";

import { useState } from "react";

type Entry = {
  id: number;
  createdAt: string;
  whatHappened: string;
  whatINeed: string;
  selfMessage: string;
};

export default function DailySelfHug() {
  const [whatHappened, setWhatHappened] = useState("");
  const [whatINeed, setWhatINeed] = useState("");
  const [selfMessage, setSelfMessage] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [info, setInfo] = useState("");
  const [autoReply, setAutoReply] = useState("");

  const buildReply = (
    whatHappenedRaw: string,
    whatINeedRaw: string,
    selfMessageRaw: string
  ) => {
    const h = whatHappenedRaw.trim();
    const n = whatINeedRaw.trim();
    const s = selfMessageRaw.trim();

    let reply = "我看到了你今天写下的这些。谢谢你愿意诚实地面对自己。";

    if (h) {
      reply += `\n\n关于你说的这件事：「${h}」，听起来对你来说并不轻松。能写出来，本身就是一种勇气。`;
    }

    if (n) {
      reply += `\n\n你也点出了自己的需要：「${n}」。能承认“我其实需要什么”，是一件很难但很重要的事，你已经在做了。`;
    }

    if (s) {
      reply += `\n\n那句你对自己说的话——「${s}」——真的很温柔。也让这句话再回到你身上：你值得被这样温柔地对待。`;
    }

    reply += "\n\n今天你已经接住了自己一次，哪怕只是写下这些，也很了不起了。慢慢来就好。🌙";

    return reply;
  };

  const handleSubmit = () => {
    if (!selfMessage.trim() && !whatHappened.trim() && !whatINeed.trim()) {
      setInfo("先随便写一点点也可以，不用完美，只要开始就好。💛");
      setAutoReply("");
      return;
    }

    const newEntry: Entry = {
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
      whatHappened: whatHappened.trim(),
      whatINeed: whatINeed.trim(),
      selfMessage: selfMessage.trim(),
    };

    setEntries([newEntry, ...entries]);
    setWhatHappened("");
    setWhatINeed("");
    setSelfMessage("");
    setInfo("今天你已经接住了自己一次，很棒。🌙");

    const reply = buildReply(
      newEntry.whatHappened,
      newEntry.whatINeed,
      newEntry.selfMessage
    );
    setAutoReply(reply);
  };

  return (
    <div
      style={{
        marginTop: 24,
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 12,
        maxWidth: 700,
      }}
    >
      <h2>🕯 每日自我接住练习</h2>
      <p style={{ marginTop: 8, color: "#555", fontSize: 14 }}>
        今天，不需要解决所有问题，只需要先把自己接住一下。
      </p>

      {/* Step 1 */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>
          ① 今天，让你不安 / 紧张 / 难受的是什么？
        </div>
        <textarea
          value={whatHappened}
          onChange={(e) => setWhatHappened(e.target.value)}
          rows={3}
          placeholder="可以是一件事、一句话、一个瞬间……随便写一点就好。"
          style={{ width: "100%", padding: 8, borderRadius: 8 }}
        />
      </div>

      {/* Step 2 */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>
          ② 如果诚实一点，你现在最需要的是什么？
        </div>
        <textarea
          value={whatINeed}
          onChange={(e) => setWhatINeed(e.target.value)}
          rows={2}
          placeholder="比如：被理解、被肯定、休息一下、有人站在我这边……"
          style={{ width: "100%", padding: 8, borderRadius: 8 }}
        />
      </div>

      {/* Step 3 */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>
          ③ 用最温柔的方式，对自己说一句话：
        </div>
        <textarea
          value={selfMessage}
          onChange={(e) => setSelfMessage(e.target.value)}
          rows={2}
          placeholder="想象有一个很懂你的人，正对你说这句话。现在，换成你来说。"
          style={{ width: "100%", padding: 8, borderRadius: 8 }}
        />
      </div>

      {/* 提交按钮 */}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: 16,
          padding: "8px 16px",
          borderRadius: 999,
          border: "none",
          cursor: "pointer",
        }}
      >
        完成今天的接住
      </button>

      {/* 提示信息 */}
      {info && (
        <p style={{ marginTop: 8, fontSize: 14, color: "#666" }}>{info}</p>
      )}

      {/* 自动回应区 */}
      {autoReply && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 10,
            background: "#f7f3ff",
            border: "1px solid #e0d5ff",
            whiteSpace: "pre-wrap",
            fontSize: 14,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 4 }}>🫂 来自系统的一段温柔回应：</div>
          {autoReply}
        </div>
      )}

      {/* 简单历史记录（本地版） */}
      {entries.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>最近的接住记录：</div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {entries.map((entry) => (
              <li
                key={entry.id}
                style={{
                  marginBottom: 12,
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #eee",
                  background: "#fafafa",
                }}
              >
                  <div style={{ fontSize: 12, color: "#999" }}>
                    {entry.createdAt}
                  </div>
                  {entry.whatHappened && (
                    <div style={{ marginTop: 4, fontSize: 13 }}>
                      🌧 今天让我难受的是：{entry.whatHappened}
                    </div>
                  )}
                  {entry.whatINeed && (
                    <div style={{ marginTop: 4, fontSize: 13 }}>
                      🌱 我其实需要：{entry.whatINeed}
                    </div>
                  )}
                  <div style={{ marginTop: 4, fontSize: 13 }}>
                    💛 我对自己说：{entry.selfMessage}
                  </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
