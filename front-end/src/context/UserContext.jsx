import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  logoutRequest,
  signupRequest,
  userRequest,
} from "../services/authServices";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const data = await userRequest();
      setUser(data.user);
    };
    getUser();
  }, []);

  const login = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginRequest(userData);
      if (data.success) {
        setUser(data);
        setError(null);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await signupRequest(userData);
      if (data.success) {
        setUser(data.user);
        setError(null);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError(err.message || "Signup error");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await logoutRequest();
      if (data.success) {
        setUser(null);
        setError(null);
      } else {
        setError(data.message || "Logout failed");
      }
    } catch (err) {
      setError(err.message || "Logout error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loading, error, login, signup, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
