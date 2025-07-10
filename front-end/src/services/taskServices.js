const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createTask = async (data, id) => {
  try {
    const res = await fetch(`${BASE_URL}/task/${id}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to create task");
  }
};

export const getTasksById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/task/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to get tasks");
  }
};

export const setTaskCompleted = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/task/completed/${id}`, {
      method: "PUT",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to complete task");
  }
};
