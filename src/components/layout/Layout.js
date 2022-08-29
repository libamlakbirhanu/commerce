import Footer from "./Footer";
import React from "react";
import { useLocation } from "react-router-dom";
import HeaderNav from "./Header";

function Layout({ children }) {
  let location = useLocation();
  console.log(location);
  return (
    <>
      {location.pathname !== "/role-choice" && <HeaderNav />}
      {children}
      {location.pathname !== "/role-choice" && <Footer />}
    </>
  );
}

export default Layout;
