"use client";

import { useState } from "react";

type TodoInputProps = {
  onAddTodo: (text: string) => void;
};

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value.trim()) {
      alert("请输入待办事项内容～");
      return;
    }

    onAddTodo(value);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: "12px", display: "flex", gap: "8px" }}
    >
      <input
        type="text"
        placeholder="输入待办事项，比如：完成今天的学习"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          flex: 1,
          padding: "6px 8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        添加
      </button>
    </form>
  );
}
