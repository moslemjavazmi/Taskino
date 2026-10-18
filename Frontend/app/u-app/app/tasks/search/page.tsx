'use client';

import { useState } from 'react';
import { apiClient } from '@packages/api-client';
type SearchTask = {
  id: string;
  title: string;
  description?: string;
};
export default function SearchTasksPage() {
  const [q, setQ] = useState('');
const [tasks, setTasks] =
  useState<SearchTask[]>([]);

  const handleSearch = async () => {
    const res = await apiClient.get(
      `/api/search/tasks?q=${q}`
    );

    setTasks(res.data);
  };

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}