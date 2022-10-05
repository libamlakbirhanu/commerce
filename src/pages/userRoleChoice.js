// import { MessageCircle, EyeCheck } from "@tabler/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Card, Text, Group, createStyles, SimpleGrid } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo192.png";
import { ASSIGN_ROLE } from "../graphql/mutations";
import { GET_ROLES } from "../graphql/queries";
import { addRole } from "../redux/authSlice";

const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef("image");

  return {
    wrapper: {
      backgroundImage: `url(${logo})`,
      // transform: "Rotate(5deg)",
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,

      "&:before": {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
      },
    },
    center: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    card: {
      position: "relative",
      height: 280,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],

      [`&:hover .${image}`]: {
        transform: "scale(1.03)",
      },
    },

    image: {
      ref: image,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: "cover",
      transition: "transform 500ms ease",
    },

    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
    },

    content: {
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      zIndex: 1,
    },

    title: {
      color: theme.white,
      marginBottom: 5,
    },

    bodyText: {
      color: theme.colors.dark[2],
      marginLeft: 7,
    },

    author: {
      color: theme.colors.dark[2],
    },
  };
});

const UserRoleChoice = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [assignRole] = useMutation(ASSIGN_ROLE);
  const {
    data: rolesData,
    loading: rolesLoading,
    error: rolesError,
  } = useQuery(GET_ROLES);
  const data = [
    {
      image:
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      link: "/store",
      title: "Want to be a store owner?",
      author: "CREATE A STORE",
      views: 7847,
      comments: 5,
      role: "vendor",
    },
    {
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      link: "/",
      title: "Want to continue as a customer?",
      author: "GO TO HOMEPAGE",
      views: 7847,
      comments: 5,
      role: "customer",
    },
  ];
  const { classes, theme } = useStyles();

  const assignRoles = async (value) => {
    const role = rolesData.roles.filter((role) => role.name === value);

    const res = await assignRole({
      variables: {
        input: {
          role: { connect: role[0].id },
          user: { connect: auth.user.id },
        },
      },
    });

    dispatch(addRole(res.data.assignRole.name));
  };

  return (
    <>
      <div className={`${classes.wrapper} ${classes.overlay}`}></div>
      <SimpleGrid cols={2} className={classes.center}>
        {data.map((item) => (
          <Card
            p="lg"
            shadow="lg"
            className={classes.card}
            radius="md"
            // component="a"
            // href={item.link}
            onClick={() => assignRoles(item.role)}
            // target="_blank"
          >
            <div
              className={classes.image}
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className={classes.overlay} />

            <div className={classes.content}>
              <div>
                <Text size="lg" className={classes.title} weight={500}>
                  {item.title}
                </Text>

                <Group position="apart" spacing="xs">
                  <Text size="sm" className={classes.author}>
                    {item.author}
                  </Text>
                </Group>
              </div>
            </div>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default UserRoleChoice;
