const HOST_URL = "http://localhost:3200/api/host/tasks";
const USER_URL = "http://localhost:3200/api/user/tasks";

export const addTaskToServer = async (taskData) => {
  const res = await fetch(HOST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(taskData),
  });

  if (!res.ok) throw new Error("Failed to add task");
  return res.json();
};

export const fetchTasksFromServer = async () => {
  const res = await fetch(HOST_URL, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch host tasks");
  return res.json();
};

export const updateTaskOnServer = async (taskId, updatedData) => {
  const res = await fetch(`${HOST_URL}/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
};

export const deleteTaskFromServer = async (taskId) => {
  const res = await fetch(`${HOST_URL}/${taskId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete task");
};

export const fetchUserTasksFromServer = async () => {
  const res = await fetch(USER_URL, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch user tasks");
  return res.json();
};

export const updateTaskStatusOnServer = async (taskId, status) => {
  const res = await fetch(`${USER_URL}/${taskId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Failed to update task status");
  return res.json();
};
