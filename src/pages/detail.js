import { createStyles, Grid, Image, Text } from "@mantine/core";
import React from "react";
import { GlassMagnifier } from "react-image-magnifiers";
import { ChevronDown, Star } from "tabler-icons-react";
import bikini from "../assets/bikini.png";
import dog from "../assets/dog.jpg";

const useStyles = createStyles((theme) => ({
  magnifier: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    img: {
      objectFit: "cover !important",
    },
  },
}));

function Detail() {
  const { classes } = useStyles();

  return (
    <Grid justify="space-between">
      <Grid.Col span={4} style={{ height: "450px" }}>
        <GlassMagnifier
          className={classes.magnifier}
          imageSrc={dog}
          imageAlt="Product image"
          magnifierSize="100%"
          square
        />
      </Grid.Col>
      <Grid.Col span={5}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Text color="gray">
            Einfache Schwarz Onyx Choker mit Baphomet Anhänger Vintage
            Pentagramm Schädel Runde Ziege Kopf Halskette Teufel Pan Gott
            Halsketten
          </Text>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ display: "flex" }}>
              <Star fill="orange" color="orange" />
              <Star fill="orange" color="orange" />
              <Star fill="orange" color="orange" />
              <Star fill="orange" color="orange" />
              <Star color="orange" />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              4.7
              <ChevronDown size={12} />
              <Text ml={10} color="gray">
                73 Bewertungen
              </Text>
              <Text ml={10} color="gray">
                292 Bestellungen
              </Text>
            </div>
          </div>
          <Text color="red" ml={30}>
            ETB 156.01 Rabatt pro ausgegebene ETB 1,560.13
          </Text>
        </div>
      </Grid.Col>
      <Grid.Col span={2}>3</Grid.Col>
    </Grid>
  );
}

export default Detail;
