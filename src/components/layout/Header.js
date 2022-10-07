import React, { useState } from "react";
import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Burger,
  Image,
  Container,
  Drawer,
  Indicator,
  Menu,
  Text,
  Divider,
  Button,
  Avatar,
  ActionIcon,
  NumberInput,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import {
  IconSearch,
  IconShoppingCart,
  IconSettings,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons";
import logo from "../../assets/logo192.png";
import { GET_PRODUCTS, GET_CART_ITEMS } from "../../graphql/queries";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    flexGrow: 1,
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

const HeaderNav = () => {
  let navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      first: 10,
      search,
    },
  });
  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
  } = useQuery(GET_CART_ITEMS);
  const [opened, toggleOpened] = useToggle([false, true]);
  const { classes } = useStyles();

  return cartData ? (
    <>
      <Drawer
        opened={opened}
        onClose={() => toggleOpened()}
        title="Menu"
        padding="xl"
        size="md"
      ></Drawer>

      <Header height={56} className={classes.header} mb={30}>
        <Container className={classes.inner} size="xl">
          <Group mr={50}>
            <Burger onClick={() => toggleOpened()} size="sm" />
            <Image
              src={logo}
              width={60}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/", { replace: true })}
            />
          </Group>

          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size={16} />}
            onChange={(val) => {
              setSearch(val);
            }}
            data={
              data
                ? data.products.data.map((item) => {
                    return {
                      // name: item.name,
                      value: item.name,
                    };
                  })
                : []
            }
          />
          <div style={{ marginLeft: 50 }}>
            <Menu width={350} position="bottom-end">
              <Menu.Target>
                <Indicator
                  inline
                  label={cartData ? cartData.myCartItems.length : 0}
                  size={16}
                  color="red"
                  style={{ cursor: "pointer" }}
                >
                  <IconShoppingCart size={30} />
                </Indicator>
              </Menu.Target>
              <Menu.Dropdown height={50}>
                {/* <Menu.Label>Application</Menu.Label> */}
                {cartData.myCartItems.map((cart) => (
                  <Menu.Item
                    icon={
                      <Avatar
                        src={cart.productVariant.images[0]}
                        alt="it's me"
                      />
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text weight={700}>
                        {cart.productVariant.description}
                      </Text>
                      <Group >
                        <div
                          style={{
                            marginLeft: "auto",
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
                            // onClick={() => setValue(value - 1)}
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
                            // onClick={() => setValue(value + 1)}
                          >
                            +
                          </ActionIcon>
                        </div>
                      </Group>
                    </div>
                  </Menu.Item>
                ))}
                <Button
                  leftIcon={<IconShoppingCart size={14} />}
                  style={{ width: "100%" }}
                >
                  Check out
                </Button>
              </Menu.Dropdown>
            </Menu>
          </div>
        </Container>
      </Header>
    </>
  ) : null;
};

export default HeaderNav;
