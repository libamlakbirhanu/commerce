import { useMutation, useQuery } from "@apollo/client";
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  createStyles,
  Grid,
  Group,
  LoadingOverlay,
  NumberInput,
  Text,
} from "@mantine/core";
import {
  IconAt,
  IconDatabase,
  IconPhoneCall,
  IconShoppingCartOff,
  IconShoppingCartPlus,
  IconTrash,
} from "@tabler/icons";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { REMOVE_CART_ITEM, UPDATE_CART_ITEM } from "../graphql/mutations";
import { GET_CART_ITEMS } from "../graphql/queries";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  wrapper: {
    marginBottom: "1rem",
    width: "100%",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    padding: "15px",
    borderRadius: "10px",
  },

  info: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },

  ticketTop: {
    padding: "20px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "15px",
    borderLeft: "5px solid #FC3677",
    borderRight: "5px solid #FC3677",
    borderBottom: "3px dotted #FC3677",
    boxSizing: "border-box",
    background: "white",
    position: "relative",

    "&::before": {
      content: '""',
      position: "absolute",
      top: "-10px",
      left: "5%",
      width: "90%",
      borderRadius: "10px",
      height: "100px",
      border: "5px solid blue",
      zIndex: "-1",
    },
  },

  ticketBottom: {
    padding: "20px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "15px",
  },
}));

function Checkout() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { classes } = useStyles();

  const [removeCartItem, { loading: removeLoading }] =
    useMutation(REMOVE_CART_ITEM);
  const [updateCartItem, { loading: updateLoading }] =
    useMutation(UPDATE_CART_ITEM);
  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
  } = useQuery(GET_CART_ITEMS);

  const handleDelete = async (cart) => {
    try {
      await removeCartItem({
        variables: {
          id: cart.id,
        },

        update(cache, { data: { deleteCartItem } }) {
          cache.updateQuery(
            {
              query: GET_CART_ITEMS,
            },
            ({ myCartItems }) => {
              return {
                myCartItems: [
                  ...myCartItems.filter(
                    (cart) => cart.id !== deleteCartItem.id
                  ),
                ],
              };
            }
          );

          const { myCartItems } = cache.readQuery({
            query: GET_CART_ITEMS,
            variables: {
              product_variant_id: cart.productVariant.id,
            },
          });

          cache.writeQuery({
            query: GET_CART_ITEMS,
            variables: {
              product_variant_id: cart.productVariant.id,
            },
            data: {
              myCartItems: [
                ...myCartItems.filter((cart) => cart.id !== deleteCartItem.id),
              ],
            },
          });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (cart, quantity) => {
    const res = await updateCartItem({
      variables: {
        input: {
          id: cart.id,
          unit_price: cart.unit_price,
          quantity: quantity,
          user: {
            connect: auth.user.id,
          },
          productVariant: {
            connect: cart.productVariant.id,
          },
        },
      },
    });
  };

  return cartLoading ? (
    <LoadingOverlay />
  ) : (
    <Grid gutter="xl">
      <Grid.Col xs={6}>
        <Text
          size="xl"
          // sx={{ textTransform: "uppercase" }}
          weight={700}
          mb="md"
          className={classes.name}
        >
          Summary Order
        </Text>
        <Text
          size="sm"
          // sx={{ textTransform: "uppercase" }}
          weight={500}
          mb="xl"
          color="dimmed"
          // className={classes.name}
        >
          Check your item and select your shipping for better experience order
          item.
        </Text>
        {cartData.myCartItems.map((cart) => (
          <div className={classes.wrapper}>
            <Group noWrap align="flex-start">
              <Avatar
                title="detail"
                onClick={() =>
                  navigate(`/detail/${cart.productVariant.id}`, {
                    replace: true,
                  })
                }
                src={cart.productVariant.images[0]}
                size={100}
                radius="md"
                style={{ cursor: "pointer" }}
              />
              <div className={classes.info}>
                <div>
                  <Text
                    size="xs"
                    sx={{ textTransform: "uppercase" }}
                    weight={700}
                    color="dimmed"
                  >
                    {cart.productVariant.description}
                  </Text>

                  <Text
                    size="lg"
                    sx={{ textTransform: "uppercase" }}
                    weight={500}
                    mb="xl"
                    className={classes.name}
                  >
                    {cart.productVariant.product.name}
                  </Text>

                  <Text
                    size="lg"
                    weight={500}
                    color="dimmed"
                    className={classes.name}
                  >
                    {cart.unit_price.toLocaleString("hi-IN", {
                      style: "currency",
                      currency: "ETB",
                    })}
                  </Text>
                </div>

                <Group style={{ flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <ActionIcon
                      disabled={cart.quantity <= 1}
                      size={32}
                      radius="xl"
                      variant="default"
                      onClick={() => handleEdit(cart, cart.quantity - 1)}
                    >
                      –
                    </ActionIcon>

                    <NumberInput
                      hideControls
                      value={cart.quantity}
                      // onChange={(val) => setValue(val)}
                      max={10}
                      min={1}
                      step={2}
                      styles={{
                        input: { width: 54, textAlign: "center" },
                      }}
                    />

                    <ActionIcon
                      disabled={cart.quantity >= 10}
                      size={32}
                      radius="xl"
                      variant="default"
                      onClick={() => handleEdit(cart, cart.quantity + 1)}
                    >
                      +
                    </ActionIcon>
                  </div>
                  <Button
                    leftIcon={<IconTrash />}
                    color="red"
                    onClick={() => handleDelete(cart)}
                  >
                    remove
                  </Button>
                </Group>
              </div>
            </Group>
          </div>
        ))}
      </Grid.Col>

      <Grid.Col xs={5} offset={1}>
        <Text
          size="xl"
          // sx={{ textTransform: "uppercase" }}
          weight={700}
          mb="md"
          className={classes.name}
        >
          Payment Details
        </Text>
        <Text
          size="sm"
          // sx={{ textTransform: "uppercase" }}
          weight={500}
          mb="xl"
          color="dimmed"
          // className={classes.name}
        >
          Complete your purchase by providing your payment details order.
        </Text>
        <div className={classes.ticketTop}>
          <Text
            size={25}
            sx={{ textTransform: "uppercase" }}
            color="#FC3677"
            weight={700}
            mb="md"
            className={classes.name}
          >
            Items
          </Text>
          {cartData.myCartItems.map((cart) => (
            <Group mb="md" align="flex-start" position="apart">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text
                  sx={{ textTransform: "uppercase" }}
                  weight={700}
                  // color="dimmed"
                >
                  {cart.productVariant.description}
                </Text>
                <Text
                  // sx={{ textTransform: "uppercase" }}
                  weight={500}
                  color="dimmed"
                >
                  {cart.quantity} pieces
                </Text>
              </div>
              <div>
                <Text
                  // sx={{ textTransform: "uppercase" }}
                  weight={500}
                  // color="dimmed"
                >
                  {(cart.unit_price * cart.quantity).toLocaleString("hi-IN", {
                    style: "currency",
                    currency: "ETB",
                  })}
                </Text>
              </div>
            </Group>
          ))}
          <Text
            // sx={{ textTransform: "uppercase" }}
            weight={700}
            align="end"
            color="#FC3677"
          >
            Total
          </Text>
          <Text
            // sx={{ textTransform: "uppercase" }}
            weight={700}
            align="end"
            color="#FC3677"
          >
            {cartData.myCartItems
              .map((cart) => cart.unit_price * cart.quantity)
              .reduce((prev, next) => prev + next)
              .toLocaleString("hi-IN", {
                style: "currency",
                currency: "ETB",
              })}
          </Text>
        </div>
        <div className={classes.ticketBottom}>
          <Button leftIcon={<IconShoppingCartPlus />} uppercase fullWidth>
            order
          </Button>
        </div>
      </Grid.Col>
    </Grid>
  );
}

export default Checkout;
