export const getProjectRequest = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/project", {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};
export const getProjectByIdRequest = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/project/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};
export const createProject = async (data) => {
  try {
    const res = await fetch("http://localhost:5000/api/project", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};
export const updateProject = async (data, projectId) => {
  console.log(projectId);
  try {
    const res = await fetch("http://localhost:5000/api/project", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, projectId }),
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};
