import { Container } from "@mantine/core";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/layout/Layout";
import About from "./pages/about";
import Index from "./pages/index";
import Detail from "./pages/detail";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";

function App() {
  return (
    <Layout>
      <Container size="xl">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="detail" element={<Detail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </Container>
    </Layout>
  );
}

export default React.memo(App);
