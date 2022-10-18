import { Button, Image, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import verify from "../assets/verificationbg.gif";

function VerifyMessage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text
        component="span"
        align="center"
        variant="gradient"
        gradient={{ from: "#FD5C90", to: "#17C37E", deg: 45 }}
        size={32}
        weight={800}
        style={{
          fontFamily: "Greycliff CF, sans-serif",
          textTransform: "uppercase",
        }}
      >
        We have sent a verification message to the email address you've
        provided. Please verify your email to continue
      </Text>
      <Image src={verify} width={500} alt="verification" />
      <Button onClick={() => navigate("/", { replace: true })}>Go home</Button>
    </div>
  );
}

export default VerifyMessage;
