import React from "react";
// import Swiper core and required modules
import { Navigation, Pagination, A11y } from "swiper";
import {
  Grid,
  useMantineTheme,
  createStyles,
  Menu,
  Avatar,
  Button,
  Text,
} from "@mantine/core";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Image } from "@mantine/core";
import productImg from "../assets/product.jpg";
import { Settings, List } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  categories: {
    listStyle: "none",
    backgroundColor: "white",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    margin: 0,
    padding: 0,
    borderRadius: "10px",
    overflow: "hidden",
    paddingBottom: "1rem",
  },
  catItem: {
    display: "flex",
    alignItems: "center",
    gap: ".5rem",
    width: "100%",
  },
  link: {
    textDecoration: "none",
  },
  linkLabel: {
    display: "block",
    fontWeight: "300",
    fontSize: "13px",
    width: "90%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",

    "&:hover": {
      fontWeight: "bold",
    },
  },
  menu: {
    width: "100%",
  },
  control: {
    display: "flex",
    gap: ".5rem",
    padding: "5px 15px",
    cursor: "pointer",

    "&:hover": {
      transform: "translate(2px, -2px)",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      fontWeight: "bold",
    },
  },
  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: "10px",
    padding: '1rem 10px',
  },
}));

function About() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const categories = [
    "Women's fashion",
    "Men's fashion",
    "Phones and Telecommunications",
    "Computer, Office and Security",
    "Consumer electronics",
    "Jewelery and Watches",
    "Home, Pet and Appliances",
    "Bags and Shoes",
    "Toys, Kids and Babies",
    "Outdoor Fun & Sports",
    "Beauty, Health & Hair",
    "Automobile and Motorcycles",
    "Home Improvement and Tools",
  ];

  const catItems = categories.map((cat, index) => (
    <li className={classes.catItem}>
      <Menu
        key="123"
        trigger="hover"
        delay={0}
        transitionDuration={0}
        placement="start"
        gutter={1}
        position="right"
        control={
          <div className={classes.control}>
            <Settings size={20} color="rgba(0,0,0,.5)" />
            <span className={classes.linkLabel}>{cat}</span>
          </div>
        }
        className={classes.menu}
      >
        <Menu.Item onClick={() => console.log("Hello")}>Label</Menu.Item>
        <Menu.Item key="12">Shoes</Menu.Item>
        <Menu.Item key="123">Pants</Menu.Item>
        <Menu.Item key="1234">Balls</Menu.Item>
        <Menu.Item key="12345">Car</Menu.Item>
      </Menu>
    </li>
  ));

  return (
    <div>
      <Grid columns={24}>
        <Grid.Col span={5}>
          <div>
            <ul className={classes.categories}>
              <div
                style={{
                  padding: "10px 15px",
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                  fontWeight: "bold",
                  marginBottom: ".6rem",
                }}
              >
                <List size={20} />
                Categories
              </div>
              {catItems}
            </ul>
          </div>
        </Grid.Col>

        <Grid.Col span={14}>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            style={{
              height: "250px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <SwiperSlide>
              <Image src={productImg} height={300} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={productImg} height={300} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={productImg} height={300} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={productImg} height={300} />
            </SwiperSlide>
          </Swiper>
        </Grid.Col>

        <Grid.Col span={5}>
          <div className={classes.right}>
            <Avatar radius="xl" size="lg" />
            <Text weight={500} mb={20}>Welcome to Express</Text>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Button radius="xl">Register</Button>
              <Button radius="xl">Sign in</Button>
            </div>
          </div>

          <div></div>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default About;
