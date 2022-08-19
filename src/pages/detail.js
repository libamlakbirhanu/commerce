import { createStyles, Grid, Image, Text } from "@mantine/core";
import React from "react";
import { SideBySideMagnifier } from "react-image-magnifiers";
import { ChevronDown, Star } from "tabler-icons-react";
// import bikini from "../assets/bikini.png";
import dog from "../assets/dog.jpg";

const useStyles = createStyles((theme) => ({
  magnifier: {
    img: {
      objectFit: "cover",
    },
  },
  smallImage: {
    padding: "2px",
    maxWidth: "max-content",
    border: "2px solid red",
  },
}));

function Detail() {
  const { classes } = useStyles();

  return (
    <Grid gutter="md">
      <Grid.Col span={4}>
        <SideBySideMagnifier
          className={classes.magnifier}
          imageSrc={dog}
          imageAlt="Product image"
          alwaysInPlace={false}
          fillAvailableSpace={true}
          fillAlignTop={true}
          // style={{ maxHeight: "450px" }}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Text color="gray">
            Einfache Schwarz Onyx Choker mit Baphomet Anhänger Vintage
            Pentagramm Schädel Runde Ziege Kopf Halskette Teufel Pan Gott
            Halsketten
          </Text>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Star fill="orange" size={18} color="orange" />
              <Star fill="orange" size={18} color="orange" />
              <Star fill="orange" size={18} color="orange" />
              <Star fill="orange" size={18} color="orange" />
              <Star color="orange" size={18} />
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
          <hr
            style={{
              width: "100%",
              border: "0.2px solid rgba(0,0,0,0.1)",
              margin: "auto",
              marginTop: "0.3rem",
              marginBottom: "1rem",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Text weight={700} size="xl">
              ETB 114.93
            </Text>
            <Text weight={500} size="md" color="gray">
              <s>ETB 191.38</s>
            </Text>
            <Text
              size="xs"
              color="red"
              style={{
                padding: "2px 5px",
                backgroundColor: "rgba(255,0,0,.1)",
                borderRadius: "2px",
              }}
            >
              -40%
            </Text>
          </div>
          <Text size="xs">
            Verkäuferrabatt: ETB 208.02 Rabatt für Bestellungen über
          </Text>

          <hr
            style={{
              width: "100%",
              border: "0.2px solid rgba(0,0,0,0.1)",
              margin: "auto",
              marginTop: "0.3rem",
              marginBottom: "1rem",
            }}
          />

          <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
            <Text size="xs" weight={500}>
              Metallfarbe:{" "}
            </Text>
            <Text size="xs" color="gray">
              Necklace
            </Text>
          </div>
          <Image
            src={dog}
            width={50}
            height={50}
            className={classes.smallImage}
            mb={10}
          />
        </div>
      </Grid.Col>
      <Grid.Col span={2}>3</Grid.Col>
    </Grid>
  );
}

export default Detail;
