import { Container, LoadingOverlay } from "@mantine/core";
import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Layout from "./components/layout/Layout";
import About from "./pages/about";
import Index from "./pages/index";
import Detail from "./pages/detail";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import UserRoleChoice from "./pages/userRoleChoice";
import Store from "./pages/store";
import Products from "./pages/products";
import Unauthorized from "./pages/unauthorized";
import CAN from "@ability/can";
import { authLogin, switchFirstEntrance } from "@redux/authSlice";
import ProductVariant from "./pages/ProductVariant";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authLogin({ name: "libe" }));
    dispatch(switchFirstEntrance());
  }, []);

  return auth.firstEntrance ? (
    <LoadingOverlay visible={auth.firstEntrance} overlayBlur={2} />
  ) : (
    <Layout>
      <Container size="xl">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="role-choice" element={<UserRoleChoice />} />
          <Route path="store" element={<Store />} />
          <Route
            path="home"
            element={!auth.user ? <Navigate replace to="/login" /> : <Home />}
          />
          <Route
            path="about"
            element={!auth.user ? <Navigate replace to="/login" /> : <About />}
          />
          <Route
            path="products"
            element={
              !auth.user ? (
                <Navigate replace to="/login" />
              ) : !CAN("read", "store") ? (
                <Navigate replace to="/unauthorized" />
              ) : (
                <Products />
              )
            }
          />
          <Route
            path="product-variants"
            element={
              !auth.user ? (
                <Navigate replace to="/login" />
              ) : !CAN("read", "store") ? (
                <Navigate replace to="/unauthorized" />
              ) : (
                <ProductVariant />
              )
            }
          />
          <Route
            path="detail"
            element={!auth.user ? <Navigate replace to="/login" /> : <Detail />}
          />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Routes>
      </Container>
    </Layout>
  );
}

export default React.memo(App);
