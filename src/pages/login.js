import React from "react";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Anchor,
  Image,
} from "@mantine/core";
import { Link } from "react-router-dom";
import loginGif from "../assets/login.gif";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
});

const Login = () => {
  const { classes } = useStyles();

  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Title
            order={2}
            className={classes.title}
            align="center"
            mt="md"
            mb={50}
          >
            Welcome back to Vastoll!
          </Title>

          <TextInput
            required
            label="email"
            placeholder="hello@gmail.com"
            size="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            label="password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md" type="submit">
            Login
          </Button>

          <Link to="/register">
            <Anchor component="button" type="button" color="gray" size="xs">
              Don't have an account? Register
            </Anchor>
          </Link>
        </form>
      </Paper>
      <Image radius="md" src={loginGif} alt="Random unsplash image" />
    </div>
  );
};

export default Login;
