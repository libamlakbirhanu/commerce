import {
  createStyles,
  Grid,
  Image,
  Text,
  Card,
  Badge,
  Button,
  NumberInput,
  Group,
  ActionIcon,
  NumberInputHandlers,
} from "@mantine/core";
import { useState, useRef } from "react";
import { SideBySideMagnifier } from "react-image-magnifiers";
import {
  IconCaretDown,
  IconChevronDown,
  IconShoppingCart,
  IconStar,
} from "@tabler/icons";
import bikini from "../assets/bikini.png";
import dog from "../assets/dog.jpg";
import { CREATE_CART_ITEM } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

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
  const [value, setValue] = useState(1);
  const handlers = useRef();
  const { classes } = useStyles();

  const [createCartItem] = useMutation(CREATE_CART_ITEM);

  const handleSubmit = (values) => {
    console.log(values)
  }

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
              <IconStar fill="orange" size={18} color="orange" />
              <IconStar fill="orange" size={18} color="orange" />
              <IconStar fill="orange" size={18} color="orange" />
              <IconStar fill="orange" size={18} color="orange" />
              <IconStar color="orange" size={18} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              4.7
              <IconChevronDown size={12} />
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
          <Group spacing={5}>
            <ActionIcon
              size={32}
              radius="xl"
              variant="default"
              onClick={() => handlers.current.decrement()}
            >
              –
            </ActionIcon>

            <NumberInput
              hideControls
              value={value}
              onChange={(val) => setValue(val)}
              handlersRef={handlers}
              max={10}
              min={1}
              step={2}
              styles={{ input: { width: 54, textAlign: "center" } }}
            />

            <ActionIcon
              size={32}
              radius="xl"
              variant="default"
              onClick={() => handlers.current.increment()}
            >
              +
            </ActionIcon>
            <Text size="xs" color="gray">
              quantity
            </Text>
          </Group>
          <Button mt="xl" leftIcon={<IconShoppingCart />}>
            Add to cart
          </Button>
        </div>
      </Grid.Col>
      <Grid.Col span={2}>
        <Text align="center" weight={700} mb="lg">
          Recommended
        </Text>
        <Card
          p="lg"
          radius="md"
          mx="md"
          mb="md"
          withBorder
          style={{ background: "none" }}
        >
          <Card.Section m="sm">
            <Image src={bikini} height={160} alt="Norway" />
          </Card.Section>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Bikini
          </Button>
        </Card>
        <Card
          p="lg"
          radius="md"
          mx="md"
          withBorder
          style={{ background: "none" }}
        >
          <Card.Section m="sm">
            <Image src={bikini} height={160} alt="Norway" />
          </Card.Section>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            wahman
          </Button>
        </Card>
      </Grid.Col>
    </Grid>
  );
}

export default Detail;
