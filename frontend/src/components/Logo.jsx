import React from "react";
import { useLocation } from "react-router-dom";

const Logo = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const logoStyle = isHome
    ? { width: "100px", margin: "20px auto", display: "block" }
    : { width: "60px", position: "absolute", top: "10px", left: "10px" };

  return <img src="/logo.png" alt="Logo" style={logoStyle} />;
};

export default Logo;
