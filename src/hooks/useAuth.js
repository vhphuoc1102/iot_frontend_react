import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { Password } from "@mui/icons-material";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useLocalStorage("token", null);
  const navigate = useNavigate();
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);
  const login = async (data) => {
    await fetch("http://localhost:8000/v0/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          setToken(response.access_token);
          navigate("main", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const logout = () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  // const value = useMemo(
  //   () => ({
  //     user,
  //     login,
  //     logout,
  //   }),
  //   [user]
  // );
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      login,
      logout,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
