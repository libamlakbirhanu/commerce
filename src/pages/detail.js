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
  LoadingOverlay,
} from "@mantine/core";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
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
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PRODUCT_VARIANT, GET_CART_ITEMS } from "../graphql/queries";

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
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const [value, setValue] = useState(1);
  const { classes } = useStyles();

  const [createCartItem, { loading: cartLoading, error: cartError }] =
    useMutation(CREATE_CART_ITEM);
  const { data, loading, error } = useQuery(GET_PRODUCT_VARIANT, {
    variables: {
      id,
    },
  });
  const { data: myCartData, loading: myCartLoading } = useQuery(
    GET_CART_ITEMS,
    {
      variables: {
        product_variant_id: id,
      },
    }
  );

  const handleSubmit = async () => {
    try {
      await createCartItem({
        variables: {
          input: {
            unit_price: data.productVariant.price,
            quantity: value,
            user: {
              connect: auth.user.id,
            },
            productVariant: {
              connect: data.productVariant.id,
            },
          },
        },
        update(cache, { data: { createCartItem } }) {
          cache.updateQuery(
            {
              query: GET_CART_ITEMS,
            },
            ({ myCartItems }) => {
              return {
                myCartItems: [...myCartItems.concat([createCartItem])],
              };
            }
          );

          const { myCartItems } = cache.readQuery({
            query: GET_CART_ITEMS,
            variables: {
              product_variant_id: id,
            },
          });

          cache.writeQuery({
            query: GET_CART_ITEMS,
            variables: {
              product_variant_id: id,
            },
            data: { myCartItems: [...myCartItems.concat([createCartItem])] },
          });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <LoadingOverlay visible={loading} overlayBlur={2} />
  ) : (
    <Grid gutter="md">
      <Grid.Col span={4}>
        <SideBySideMagnifier
          className={classes.magnifier}
          imageSrc={data.productVariant.images[0]}
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
          <Text weight={700}>
            VENDOR - {data.productVariant.product?.store?.name}
          </Text>
          <Text weight={700}>{data.productVariant.product?.brand?.name}</Text>
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
            </div>
          </div>
          <hr
            style={{
              width: "50%",
              border: "0.2px solid rgba(0,0,0,0.1)",
              // margin: "auto",
              marginTop: "0.3rem",
              marginBottom: "1rem",
            }}
          />
          <Text weight={500} size="sm">
            {data.productVariant.description}
          </Text>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <Text weight={700} size="xl">
              {data.productVariant.price.toLocaleString("hi-IN", {
                style: "currency",
                currency: "ETB",
              })}
            </Text>
            <Text weight={500} size="md" color="gray">
              <s>ETB 5,800.00</s>
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
          <hr
            style={{
              width: "75%",
              border: "0.2px solid rgba(0,0,0,0.1)",
              // margin: "auto",
              marginTop: "0.3rem",
              marginBottom: "1rem",
            }}
          />
          <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
            <Text size="xs" weight={500}>
              product:{" "}
            </Text>
            <Text size="xs" color="gray">
              {data.productVariant.product.name}
            </Text>
          </div>
          <Image
            src={data.productVariant.images[0]}
            width={50}
            height={50}
            className={classes.smallImage}
            mb={10}
          />
          <Group spacing={5}>
            <ActionIcon
              disabled={value <= 1}
              size={32}
              radius="xl"
              variant="default"
              onClick={() => setValue(value - 1)}
            >
              –
            </ActionIcon>

            <NumberInput
              hideControls
              value={value}
              onChange={(val) => setValue(val)}
              max={10}
              min={1}
              step={2}
              styles={{ input: { width: 54, textAlign: "center" } }}
            />

            <ActionIcon
              disabled={value >= 10}
              size={32}
              radius="xl"
              variant="default"
              onClick={() => setValue(value + 1)}
            >
              +
            </ActionIcon>
            <Text size="xs" color="gray">
              quantity
            </Text>
          </Group>
          <Button
            disabled={myCartLoading || myCartData?.myCartItems?.length}
            mt="xl"
            loading={cartLoading}
            leftIcon={<IconShoppingCart />}
            onClick={handleSubmit}
          >
            {!myCartLoading && !myCartData?.myCartItems?.length
              ? "Add to cart"
              : "In cart"}
          </Button>
        </div>
      </Grid.Col>
      <Grid.Col span={2}>
        <Text align="center" weight={700} mb="lg">
          Recommended
        </Text>
        <Card p="lg" radius="md" mx="md" mb="md" style={{ background: "none" }}>
          <Card.Section m="sm">
            <Image src={dog} height={160} alt="Norway" />
          </Card.Section>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Dog
          </Button>
        </Card>
        <Card p="lg" radius="md" mx="md" style={{ background: "none" }}>
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
