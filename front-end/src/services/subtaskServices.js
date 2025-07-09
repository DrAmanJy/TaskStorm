export const getSubtasksById = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/subtask/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to get Tasks");
  }
};
export const getTaskById = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/subtask/task/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to get Tasks");
  }
};
export const setCompleted = async (completed, id) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/subtask/complete/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: completed }),
      }
    );
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to get Tasks");
  }
};
