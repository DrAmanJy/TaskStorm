const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("ENV:", import.meta.env.VITE_API_BASE_URL, "BASE_URL:", BASE_URL);

export const loginRequest = async (userData) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
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
    const res = await fetch(`${BASE_URL}/auth/signup`, {
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
    const res = await fetch(`${BASE_URL}/auth/logout`, {
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Logout failed");
  }
};

export const userRequest = async () => {
  try {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed");
  }
};
