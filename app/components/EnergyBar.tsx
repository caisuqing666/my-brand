"use client";

import { useState, useEffect } from "react";

export default function EnergyBar() {
  const messages = [
    "🌿 今天的能量：柔软但坚定",
    "🌙 今天的状态：慢一点也没关系",
    "☀️ 今天的小力量：向前一厘米",
    "✨ 今日心情：轻轻努力却在成长",
    "💛 今天的我：温柔且清醒",
  ];

  const [message, setMessage] = useState("");

  useEffect(() => {
    const random = Math.floor(Math.random() * messages.length);
    setMessage(messages[random]);
  }, []);

  return (
    <div className="w-full bg-[#f7f3ef] text-[#4e3b31] p-3 rounded-xl text-center text-sm shadow-sm">
      {message}
    </div>
  );
}
