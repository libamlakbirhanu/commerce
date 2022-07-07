import React from "react";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Anchor,
  Image,
} from "@mantine/core";
import { Link } from "react-router-dom";
import loginGif from "../assets/login-bg0.gif";
import { REGISTER } from "../graphql/mutations";

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
  password: Yup.string().min(
    8,
    "password must be at least 8 to create an account"
  ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const Register = () => {
  const [register, { data, loading, error }] = useMutation(REGISTER);
  const { classes } = useStyles();

  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  if (data) console.log(data);

  const handleSubmit = (values) => {
    try {
      register({
        variables: {
          input: {
            email: values.email,
            password: values.password,
            password_confirmation: values.confirmPassword,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Image radius="md" src={loginGif} alt="Random unsplash image" />
      <Paper className={classes.form} radius={0} p={30}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Title
            order={2}
            className={classes.title}
            align="center"
            mt="md"
            mb={50}
          >
            Welcome to Vastoll! Enjoy
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
          <PasswordInput
            required
            label="confirmPassword"
            placeholder="Confirm your password"
            mt="md"
            size="md"
            {...form.getInputProps("confirmPassword")}
          />
          <Button fullWidth mt="xl" size="md" type="submit">
            Register
          </Button>

          <Link to="/login">
            <Anchor component="button" type="button" color="gray" size="xs">
              Already have an account? Login
            </Anchor>
          </Link>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
