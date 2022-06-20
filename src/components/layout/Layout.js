import React from "react";
import HeaderNav from "./Header";

function Layout({ children }) {
  return (
    <>
      <HeaderNav />
      {children}
    </>
  );
}

export default Layout;
