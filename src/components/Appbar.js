import React from "react";
import { Link } from "react-router-dom";
import "./Appbar.css";
import { useAuth } from "../hooks/useAuth";
export default function NavBar() {
  const { logout } = useAuth();

  return (
    <nav className="topnav">
      <Link to="crops">Cây trồng</Link>
      <Link to="fertilizer">Phân bón</Link>
      <Link to="pesticide">Thuốc</Link>
      <Link to="help">Tư vấn</Link>
      <Link to="/" onClick={() => logout()}>
        Logout
      </Link>
    </nav>
  );
}
