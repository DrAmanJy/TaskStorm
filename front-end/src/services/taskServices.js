export const createTask = async (data, id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/task/${id}`, {
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
    const res = await fetch(`http://localhost:5000/api/task/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to get Tasks");
  }
};
