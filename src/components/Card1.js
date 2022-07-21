import { createStyles, Image, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import shoes from "../assets/shoes.png";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer",
    boxSizing: "border-box",
    position: "relative",
    marginBottom: "0.8rem",

    "&:hover::before": {
      position: "absolute",
      content: '""',
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: "3px solid red",
      borderBottom: "20px solid red",
      zIndex: "1",
    },

    "&:hover::after": {
      position: "absolute",
      content: '"Similar items"',
      bottom: "-30px",
      left: 0,
      width: "103%",
      height: "30px",
      backgroundColor: "red",
      color: "white",
      textAlign: "center",
      paddingTop: "10px",
      zIndex: "2",
      borderRadius: "0  0 10px 10px",
    },
  },
  percentage: {
    backgroundColor: "#fc1f67",
    color: "white",
    display: "flex",
    alignItems: "center",
    width: "max-content",
    borderRadius: "3px",
    padding: "2px 5px",
    fontSize: ".8rem",
  },
}));

function Card1() {
  let navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <div
      className={classes.wrapper}
      onClick={() => navigate("/detail", { replace: true })}
    >
      <Image src={shoes} width={170} className={classes.image} mb={10} />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
        <Text className={classes.largeText} size="lg" color="gray" weight={600}>
          Fashion Sports TF Key
        </Text>
        <Text className={classes.largeText} size="md" color="#A8803A">
          Lowest price in 30 days
        </Text>
        <Text className={classes.largeText} weight="bold" size="xl">
          ETB 327.56
        </Text>
        <Text className={classes.largeText} size="xs" color="red">
          -40 %
        </Text>
        <Text className={classes.largeText} size="md" color="gray" weight={500}>
          45 sold
        </Text>
      </div>
    </div>
  );
}

export default Card1;
