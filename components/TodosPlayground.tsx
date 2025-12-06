"use client";

import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const initialTodos: Todo[] = [
  { id: 1, text: "完成今天的 Next.js 学习", completed: false },
  { id: 2, text: "跑步或拉伸一下身体", completed: false },
];

export default function TodosPlayground() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <section
      style={{
        marginTop: "24px",
        marginBottom: "24px",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "12px" }}>TODO 清单练习场 ✅</h2>

      <TodoInput onAddTodo={handleAddTodo} />

      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </section>
  );
}
