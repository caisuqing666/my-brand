"use client";

import { useState } from "react";

export default function TodoList() {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

  // 添加任务
  const addTodo = () => {
    if (!input.trim()) return; // 空内容不添加

    setTodos([...todos, input]);
    setInput(""); // 清空输入框
  };

  // 删除任务
  const deleteTodo = (index: number) => {
    const newList = todos.filter((_, i) => i !== index);
    setTodos(newList);
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>📝 Todo 清单</h2>

      {/* 输入框 */}
      <input
        value={input}
        placeholder="输入任务"
        onChange={(e) => setInput(e.target.value)}
        style={{ marginRight: 10 }}
      />

      {/* 添加按钮 */}
      <button onClick={addTodo}>添加</button>

      <ul style={{ marginTop: 20 }}>
        {todos.map((item, index) => (
          <li key={index} style={{ marginBottom: 8 }}>
            {item}
            <button
              onClick={() => deleteTodo(index)}
              style={{ marginLeft: 10, color: "red" }}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
