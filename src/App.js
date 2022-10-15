import { Container, LoadingOverlay } from "@mantine/core";
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { authLogin, switchFirstEntrance } from "@redux/authSlice";
import ProductVariant from "./pages/ProductVariant";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "./graphql/queries";
import Checkout from "./pages/checkout";
import { useAbility } from "@casl/react";
import { AbilityContext } from "./casl/can";

function App() {
  const auth = useSelector((state) => state.auth);
  const ability = useAbility(AbilityContext);
  const dispatch = useDispatch();
  const [me] = useLazyQuery(GET_USER);

  const fetchUser = async () => {
    const res = await me();

    dispatch(switchFirstEntrance());
    res.data.me &&
      dispatch(
        authLogin({
          ...res.data.me,
        })
      );
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return auth.firstEntrance ? (
    <LoadingOverlay visible={auth.firstEntrance} overlayBlur={2} />
  ) : (
    <Layout>
      <Container size="xl">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="role-choice"
            element={
              !auth.user ? (
                <Navigate replace to="/login" />
              ) : !auth.user.roles.length ? (
                <UserRoleChoice />
              ) : auth.user.roles[0].name === "vendor" ? (
                <Navigate replace to="/store" />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
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
              ) : !ability.can("read", "store") ? (
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
              ) : !ability.can("read", "store") ? (
                <Navigate replace to="/unauthorized" />
              ) : (
                <ProductVariant />
              )
            }
          />
          <Route
            path="detail/:id"
            element={!auth.user ? <Navigate replace to="/login" /> : <Detail />}
          />
          <Route
            path="checkout"
            element={
              !auth.user ? <Navigate replace to="/login" /> : <Checkout />
            }
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
