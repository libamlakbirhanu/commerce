import Footer from "./Footer";
import React from "react";
import { useLocation } from "react-router-dom";
import HeaderNav from "./Header";

function Layout({ children }) {
  let location = useLocation();
  const exclude = [
    "/role-choice",
    "/unauthorized",
    "/login",
    "/register",
    "/verify",
    "/verify-message",
  ];

  return (
    <>
      {!exclude.includes(location.pathname) && <HeaderNav />}
      {children}
      {!exclude.includes(location.pathname) && <Footer />}
    </>
  );
}

export default Layout;
