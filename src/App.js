import { Container } from "@mantine/core";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/layout/Layout";
import About from "./pages/about";
import Home from "./pages/home";

function App() {
  return (
    <Layout>
      <Container size="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </Container>
    </Layout>
  );
}

export default React.memo(App);
