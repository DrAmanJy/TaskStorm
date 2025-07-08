export const loginRequest = async (userData) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
};

export const signupRequest = async (userData) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Signup failed");
  }
};

export const logoutRequest = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/logout");
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Logout failed");
  }
};
export const userRequest = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed");
  }
};
