import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import NavBar from "./Appbar";

export default function Main() {
  return (
    <div>
      <NavBar />
      <Outlet></Outlet>
    </div>
  );
}
