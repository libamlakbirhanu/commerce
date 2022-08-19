import React, { useState } from "react";
// import Swiper core and required modules
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import {
  Grid,
  useMantineTheme,
  createStyles,
  Menu,
  Avatar,
  Button,
  Text,
  SimpleGrid,
} from "@mantine/core";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Image } from "@mantine/core";
import productImg from "../assets/product.jpg";
import { Settings, List } from "tabler-icons-react";
import Card2 from "../components/Card2";
import Card1 from "../components/Card1";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";

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
  middle: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    gap: "1rem",
  },
  middleBottom: {
    flexGrow: 1,
    backgroundColor: "white",
    borderRadius: "10px",
  },
  hotProducts: {
    width: "95%",
    margin: "auto",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    height: "100%",
  },
  rightTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "1rem 10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  rightBottom: {
    flexGrow: "1",
    borderRadius: "10px",
    backgroundColor: "#ff6884",
    padding: "10px",
  },
  money: {
    backgroundColor: "#ffd4b4",
    width: "max-content",
    padding: "0.5rem 1rem",
    borderRadius: "10px",
    marginBottom: "1.5rem",
  },
  weeklyDeals: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "15px 25px",
  },
  weeklyDealsImages: {
    display: "flex",
    gap: ".5rem",
    justifyContent: "space-between",
  },
  textWrapper: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
}));

function Index() {
  const [page, setPage] = useState(0);
  let navigate = useNavigate();
  const { classes } = useStyles();
  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: { first: 5, offset: page * 5 },
  });

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
        <Menu.Item>Label</Menu.Item>
        <Menu.Item key="12">Shoes</Menu.Item>
        <Menu.Item key="123">Pants</Menu.Item>
        <Menu.Item key="1234">Balls</Menu.Item>
        <Menu.Item key="12345">Car</Menu.Item>
      </Menu>
    </li>
  ));

  const increment = () => {
    setPage((prev) => prev + 1);
  }

  const decrement = () => {
    setPage((prev) => prev - 1);
  }

  return (
    <div>
      <Grid columns={24} mb={30}>
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
          <div className={classes.middle}>
            <div>
              <Swiper
                // install Swiper modules
                modules={[Autoplay, Pagination, A11y]}
                autoplay
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}
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
            </div>
            <div className={classes.middleBottom}>
              <div className={classes.hotProducts}>
                <Text weight={700} mb={10} mt={10} size="xl">
                  Super<span style={{ color: "red" }}>Deals</span>
                </Text>
                <Text weight={400} mb={10}>
                  Top Products. Incredible prices
                </Text>
                <div className={classes.money}>
                  <Text weight={700} size="xl">
                    ETB 207.48
                  </Text>
                </div>

                <Swiper
                  // install Swiper modules
                  modules={[Autoplay, Pagination, A11y]}
                  autoplay
                  spaceBetween={10}
                  slidesPerView={5}
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  // onSwiper={(swiper) => console.log(swiper)}
                  // onSlideChange={() => console.log("slide change")}
                  style={{
                    height: "100px",
                    overflow: "hidden",
                  }}
                >
                  <SwiperSlide>
                    <Image src={productImg} height={100} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image src={productImg} height={100} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image src={productImg} height={100} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image src={productImg} height={100} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image src={productImg} height={100} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image src={productImg} height={100} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image src={productImg} height={100} />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </Grid.Col>

        <Grid.Col span={5}>
          <div className={classes.right}>
            <div className={classes.rightTop}>
              <Avatar radius="xl" size="lg" />
              <Text weight={700} mb={20} size="xl">
                Welcome to Vastoll
              </Text>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Button
                  radius="xl"
                  onClick={() => navigate("/about", { replace: true })}
                >
                  Join
                </Button>
                <Button radius="xl" variant="outline">
                  Sign in
                </Button>
              </div>
            </div>

            <div className={classes.rightBottom}>
              <Text weight={700} size="lg">
                Welcome to Vastoll
              </Text>
              <Text weight={400} mb={20}>
                get items at 70% off
              </Text>
              <Swiper
                // install Swiper modules
                modules={[Autoplay, Pagination, A11y]}
                autoplay
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}
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
            </div>
          </div>
        </Grid.Col>
      </Grid>

      <div className={classes.weeklyDeals}>
        <div className={classes.textWrapper}>
          <div>
            <Text weight="700" size="xl">
              Weekly Deals
            </Text>
            <Text weight={300} mb={20}>
              Low price for 30 days
            </Text>
          </div>
          <Text weight={300}>VIEW MORE</Text>
        </div>
        <div className={classes.weeklyDealsImages}>
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
        </div>
      </div>

      {loading ? (
        <p>loading...</p>
      ) : error ? (
        <p>Something went wrong. Please try refreshing the page</p>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          <Text size="xl" weight="700" mb={20}>
            More to love
          </Text>

          <SimpleGrid
            cols={6}
            spacing="sm"
            breakpoints={[
              { maxWidth: "lg", cols: 5, spacing: "lg" },
              { maxWidth: "md", cols: 3, spacing: "md" },
              { maxWidth: "sm", cols: 2, spacing: "sm" },
              { maxWidth: "xs", cols: 1, spacing: "sm" },
            ]}
          >
            {data.products.map((product, i) => (
              <Card1 product={product} key={product.id} />
            ))}
          </SimpleGrid>

          <div style={{ marginTop: "2rem" }}></div>
          <button style={{cursor: 'pointer'}} disabled={page <= 0} onClick={decrement}>prev</button>
          <button style={{cursor: 'pointer'}} onClick={increment}>next</button>
        </div>
      )}
    </div>
  );
}

export default Index;
