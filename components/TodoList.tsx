"use client";

import type { Todo } from "./TodosPlayground";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
};

export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return <p style={{ marginTop: "8px" }}>目前还没有待办事项，先添加一条吧～</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggleTodo(todo.id)}
          onDelete={() => onDeleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
}
