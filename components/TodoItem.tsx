"use client";

import type { Todo } from "./TodosPlayground";

type TodoItemProps = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 8px",
        borderBottom: "1px solid #eee",
      }}
    >
      <span
        onClick={onToggle}
        style={{
          flex: 1,
          cursor: "pointer",
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#999" : "#333",
        }}
      >
        {todo.text}
      </span>
      <button
        onClick={onDelete}
        style={{
          marginLeft: "8px",
          padding: "2px 6px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        删除
      </button>
    </li>
  );
}
