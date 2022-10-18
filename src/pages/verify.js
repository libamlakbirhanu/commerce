import { useMutation } from "@apollo/client";
import { Image, Text } from "@mantine/core";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import loader from "../assets/loader.gif";
import { VERIFY_EMAIL } from "../graphql/mutations";
import { authLogin } from "../redux/authSlice";
import { isLoggedInVar, user } from "../store";

function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyEmail] = useMutation(VERIFY_EMAIL);

  const verify = async () => {
    try {
      const res = await verifyEmail({
        variables: {
          input: {
            token: searchParams.get("token"),
          },
        },
      });

      localStorage.setItem("token", res.data.verifyEmail.access_token);

        isLoggedInVar(true);
        user(res.data.verifyEmail.user);

        dispatch(authLogin(res.data.verifyEmail.user));

        !res.data.verifyEmail.user.roles.length
          ? navigate("/role-choice", { replace: true })
          : navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Text size={36} weight={900} color="#FD5C90">
        Authenticating
      </Text>
      <Text weight={700}>Please wait ...</Text>
      <Image width={200} src={loader} alt="loader" />
    </div>
  );
}

export default Verify;
