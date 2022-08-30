import { createStyles, Image, Text } from "@mantine/core";
import React from "react";
import { IconArrowWaveRightUp } from "@tabler/icons";
import watch from "../assets/watch.jpg";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
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

function Card2() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Image src={watch} width={170} className={classes.image} />
      <Text className={classes.largeText} weight="bold">
        ETB 327.56
      </Text>
      <span className={classes.percentage}>
        <IconArrowWaveRightUp color="white" /> -35%
      </span>
    </div>
  );
}

export default Card2;
