const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getSubtasksById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/subtask/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to get Subtasks");
  }
};

export const getTaskById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/subtask/task/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to get Task");
  }
};

export const setCompleted = async (completed, id) => {
  try {
    const res = await fetch(`${BASE_URL}/subtask/complete/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complete: completed }),
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to set completion status");
  }
};

export const createSubtask = async (data, id) => {
  try {
    const res = await fetch(`${BASE_URL}/subtask/${id}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to create subtask");
  }
};
