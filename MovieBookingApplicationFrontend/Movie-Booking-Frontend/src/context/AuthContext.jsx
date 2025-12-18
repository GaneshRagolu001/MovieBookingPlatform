import { createContext, useContext, useEffect, useState } from "react";
import { currentUserApi } from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [tokenExpired, setTokenExpired] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const login = (jwt, userData) => {
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(jwt);
    setUser(userData);
    setTokenExpired(false); // Reset expiry on successful login
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await currentUserApi();
        if (res.status === 401) {
          logout();
          setTokenExpired(true);
        } else if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, tokenExpired, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const AuthUser = () => useContext(AuthContext);
