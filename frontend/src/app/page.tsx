"use client";
import React, { useState, useEffect } from "react";
import {
  fetchTasks,
  createTask,
  toggleTask,
  removeTask,
  Task,
} from "../lib/api";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    fetchTasks()
      .then((data) => {
        if (mounted) setTasks(data);
      })
      .catch((err) => console.error("Failed to fetch tasks:", err));
    return () => {
      mounted = false;
    };
  }, []);

  async function handleAdd() {
    const title = newTitle.trim();
    if (!title) return;
    try {
      const created = await createTask(title);
      setTasks((prev) => [...prev, created]);
    } catch (err) {
      console.error("Failed to create task:", err);
    }
    setNewTitle("");
  }

  const handleToggle = async (task: Task) => {
    try {
      const updated = await toggleTask(task.id, !task.done);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await removeTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2x1 font-bold">Task Manager</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
        className="mt-4 flex gap-2"
      >
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task..."
          className="border px-2 py-1 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </form>

      <ul className="mt-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => handleToggle(task)}
                aria-label={`Mark ${task.title}`}
              />
              <span className={task.done ? "line-through text-gray-500" : ""}>
                {task.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
                aria-label={`Delete ${task.title}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
