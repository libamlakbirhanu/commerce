import React, { useState } from "react";
import InputWithTooltip from "../components/InputWithTooltip";
import { Container, Paper, Button } from "@mantine/core";
import { useMutation } from "@apollo/client";
import { CREATE_STORE } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

function Store() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const [createStore, { loading, error }] = useMutation(CREATE_STORE);

  const handleSubmit = async () => {
    try {
      await createStore({
        variables: {
          input: {
            name,
            description,
          },
        },
      });

      navigate("/products", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container size={460} my={30}>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <InputWithTooltip
          label="Store name"
          tooltip="store name is used to identify your store"
          placeholder="your store name"
          state={name}
          setState={setName}
        />
        <InputWithTooltip
          label="description"
          tooltip="helps customers get a little more information about your store"
          placeholder="small description"
          state={description}
          setState={setDescription}
        />
        <Button
          loading={loading}
          variant="light"
          radius="xl"
          size="md"
          style={{ marginTop: "2rem", width: "100%" }}
          onClick={handleSubmit}
        >
          submit
        </Button>
      </Paper>
    </Container>
  );
}

export default Store;
