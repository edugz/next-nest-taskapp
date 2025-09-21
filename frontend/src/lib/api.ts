export interface Task {
  id: number;
  title: string;
  done: boolean;
}

const API_URL = "http://localhost:3001";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
}

export async function createTask(title: string): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function toggleTask(id: number, done: boolean): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done }),
  });
  return res.json();
}

export async function removeTask(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
}
