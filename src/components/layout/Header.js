import React from "react";
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
import { useNavigate } from "react-router-dom";

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

const data = {
  links: [
    {
      link: "/about",
      label: "Features",
    },
    {
      link: "/pricing",
      label: "Pricing",
    },
    {
      link: "/learn",
      label: "Learn",
    },
    {
      link: "/community",
      label: "Community",
    },
  ],
};

const HeaderNav = () => {
  let navigate = useNavigate();
  const [opened, toggleOpened] = useToggle([false, true]);
  const { classes } = useStyles();

  const { links } = data;

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
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
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
          />
          <div style={{ marginLeft: 50 }}>
            <Menu width={200} position="bottom-end">
              <Menu.Target>
                <Indicator
                  inline
                  label="3"
                  size={16}
                  color="red"
                  style={{ cursor: "pointer" }}
                >
                  <IconShoppingCart size={30} />
                </Indicator>
              </Menu.Target>
              <Menu.Dropdown>
                {/* <Menu.Label>Application</Menu.Label> */}
                <Menu.Item icon={<IconSettings size={14} />}>
                  Settings
                </Menu.Item>
                <Menu.Item icon={<IconMessageCircle size={14} />}>
                  Messages
                </Menu.Item>
                <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
                <Menu.Item
                  icon={<IconSearch size={14} />}
                  rightSection={
                    <Text size="xs" color="dimmed">
                      ⌘K
                    </Text>
                  }
                >
                  Search
                </Menu.Item>
                <Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
                  Transfer my data
                </Menu.Item>
                <Menu.Item color="red" icon={<IconTrash size={14} />}>
                  Delete my account
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </Container>
      </Header>
    </>
  );
};

export default HeaderNav;
