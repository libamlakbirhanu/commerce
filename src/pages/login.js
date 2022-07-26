import React from "react";
import { useMutation } from "@apollo/client";
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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogin } from "../redux/authSlice";
import loginGif from "../assets/login-bg0.gif";
import { LOGIN } from "../graphql/mutations";
import { isLoggedInVar, user } from "../store";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },

  form: {
    // borderRight: `1px solid ${
    //   theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    // }`,
    backgroundColor: "transparent",
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  errorMessage: {
    color: "red",
    marginBottom: "1rem",
    backgroundColor: "rgba(255,0,0,.1)",
    border: "1px solid red",
    padding: "10px",
    borderRadius: "5px",
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
  const dispatch = useDispatch();
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const { classes } = useStyles();

  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const res = await login({
        variables: {
          input: {
            username: values.email,
            password: values.password,
          },
        },
      });

      if (res.data.login) {
        localStorage.setItem("token", res.data.login.access_token);
        localStorage.setItem("userId", res.data.login.user.id);
        isLoggedInVar(true);
        user(res.data.login.user);
      }
      dispatch(authLogin(res.data.login.user));
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
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

          {error && <div className={classes.errorMessage}>{error.message}</div>}
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
          <Button fullWidth mt="xl" size="md" type="submit" loading={loading}>
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
