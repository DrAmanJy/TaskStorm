const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProjectRequest = async () => {
  try {
    const res = await fetch(`${BASE_URL}/project`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to get projects");
  }
};

export const getProjectByIdRequest = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/project/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to get project by ID");
  }
};

export const createProject = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/project`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to create project");
  }
};

export const updateProject = async (data, projectId) => {
  try {
    const res = await fetch(`${BASE_URL}/project`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, projectId }),
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to update project");
  }
};
