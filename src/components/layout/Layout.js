import Footer from "./Footer";
import React from "react";
import HeaderNav from "./Header";

function Layout({ children }) {
  return (
    <>
      <HeaderNav />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
