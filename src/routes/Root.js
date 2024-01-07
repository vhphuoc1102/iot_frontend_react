import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
export default function Root() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/signin");
  }, []);
  return null;
}
