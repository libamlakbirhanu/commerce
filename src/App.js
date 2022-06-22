import { Container } from "@mantine/core";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/layout/Layout";
import About from "./pages/about";
import Index from "./pages/index";
import Detail from "./pages/detail";

function App() {
  return (
    <Layout>
      <Container size="xl">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="about" element={<About />} />
          <Route path="detail" element={<Detail />} />
        </Routes>
      </Container>
    </Layout>
  );
}

export default React.memo(App);
