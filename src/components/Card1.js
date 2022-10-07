import { createStyles, Image, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import shoes from "../assets/shoes.png";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "1rem",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer",
    boxSizing: "border-box",
    position: "relative",
    marginBottom: "0.8rem",
    // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    boxShadow:
      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",

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
  image: {
    objectFit: "cover",
    // maxHeight: "150px",
  },
}));

function Card1({ product }) {
  let navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <div
      className={classes.wrapper}
      onClick={() => navigate(`/detail/${product.id}`, { replace: true })}
    >
      <Image
        src={product.images[0]}
        height={200}
        className={classes.image}
        mb={10}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
        <Text className={classes.largeText} size="lg" color="gray" weight={600}>
          {product.product.name}
        </Text>
        <Text className={classes.largeText} size="md" color="#A8803A">
          {product.description}
        </Text>
        <Text className={classes.largeText} weight="bold" size="xl">
          {product.price.toLocaleString("hi-IN", {
            style: "currency",
            currency: "ETB",
          })}
        </Text>
        <Text className={classes.largeText} size="xs" color="red">
          -40 %
        </Text>
        <Text className={classes.largeText} size="md" color="gray" weight={500}>
          40 sold
        </Text>
      </div>
    </div>
  );
}

export default Card1;
