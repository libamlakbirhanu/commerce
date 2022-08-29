import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import unauthorized from "@assets/unauthorized.svg";

function Unauthorized() {
  let navigate = useNavigate();

  return (
    <div
      style={{ maxWidth: "500px", marginInline: "auto", textAlign: "center" }}
    >
      <h1>UNAUTHORIZED!</h1>
      <img src={unauthorized} style={{ width: "100%" }} alt="" />
      <Button
        mt={50}
        variant="subtle"
        onClick={() => navigate("/", { replace: true })}
      >
        Back to home
      </Button>
    </div>
  );
}

export default Unauthorized;
