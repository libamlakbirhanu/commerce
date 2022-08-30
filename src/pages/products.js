import React, { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Group,
  Button,
  Card,
  Select,
  Text,
  Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNetwork } from "@mantine/hooks";
import { GET_PRODUCTS, GET_CATEGORIES, GET_BRANDS } from "@graphql/queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT } from "@graphql/mutations";
import uuid from "react-uuid";

function Products() {
  const [opened, setOpened] = useState(false);

  const networkStatus = useNetwork();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      category: "",
      brand: "",
      attributes: [
        {
          name: "",
          description: "",
          attributeOptions: { create: [] },
        },
      ],
    },
  });

  const attributeFields = form.values.attributes.map((item, index) => (
    <Card shadow="sm" p="lg" radius="md" mb={10} withBorder key={index}>
      <Group>
        <TextInput
          placeholder="Attribute name"
          required
          sx={{ flex: 1 }}
          {...form.getInputProps(`attributes.${index}.name`)}
        />
        <TextInput
          placeholder="Short description"
          sx={{ flex: 2 }}
          {...form.getInputProps(`attributes.${index}.description`)}
        />
      </Group>
      <Group mt="sm">
        <Button
          sx={{ flex: 1 }}
          onClick={() =>
            form.insertListItem(`attributes.${index}.attributeOptions.create`, {
              name: "",
            })
          }
        >
          add options
        </Button>

        {item.attributeOptions.create.length > 0 &&
          item.attributeOptions.create.map((_, i) => (
            <TextInput
              key={i}
              placeholder="Attribute option"
              style={{ width: "100%" }}
              {...form.getInputProps(
                `attributes.${index}.attributeOptions.create.${i}.name`
              )}
            />
          ))}
      </Group>
    </Card>
  ));

  const [createProduct, { data: productData, loading: productLoading }] =
    useMutation(CREATE_PRODUCT);
  const [getCategories, { data: categoryData, loading: categoryLoading }] =
    useLazyQuery(GET_CATEGORIES, {
      variables: {
        first: 10,
        search: "",
      },
    });
  const [getBrands, { data: brandData, loading: brandLoading }] = useLazyQuery(
    GET_BRANDS,
    {
      variables: {
        first: 10,
      },
    }
  );
  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      first: 10,
      page: 1,
    },
  });

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  const handleCategorySearch = (value) => {
    getCategories({
      variables: {
        search: value,
      },
    });
  };

  // const handleBrandSearch = (value) => {
  //   getCategories({
  //     variables: {
  //       search: value,
  //     },
  //   });
  // };

  const addProduct = (values) => {
    createProduct({
      variables: {
        category_id: values.category,
        store_id: "07fd3e0d-3a2b-4bb7-9048-141c6e4eb12d",
        attributes: [...values.attributes],
        brand_id: values.brand,
        sku: uuid(),
        name: values.name,
        description: values.description,
      },
    });
  };

  if (!networkStatus.online)
    return <p>Oops... you're device appears to be offline</p>;
  if (loading) return <p>loading...</p>;

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          form.reset();
        }}
        title="Add product"
        size="lg"
      >
        <form onSubmit={form.onSubmit((values) => addProduct(values))}>
          <TextInput
            mb={10}
            withAsterisk
            label="Name"
            placeholder="store name"
            {...form.getInputProps("name")}
          />
          <TextInput
            mb={10}
            withAsterisk
            label="Description"
            placeholder="store description"
            {...form.getInputProps("description")}
          />
          <Select
            mb={10}
            label="Select category"
            placeholder="Pick one"
            searchable
            nothingFound="Nothing Found"
            maxDropdownHeight={250}
            data={
              categoryData
                ? categoryData.categories.data.map((category) => {
                    return {
                      label: category.name,
                      value: category.id,
                    };
                  })
                : []
            }
            onKeyUp={(e) => handleCategorySearch(e.target.value)}
            {...form.getInputProps("category")}
          />
          <Select
            mb={10}
            label="Select a brand"
            placeholder="Pick one"
            // searchable
            nothingFound="Nothing Found"
            data={
              brandData
                ? brandData.brands.data.map((brand) => {
                    return {
                      label: brand.name,
                      value: brand.id,
                    };
                  })
                : []
            }
            // onKeyUp={(e) => handleBrandSearch(e.target.value)}
            {...form.getInputProps("brand")}
          />
          <Text weight={500} size="sm">
            Attributes
          </Text>

          {attributeFields}

          <Button
            mt={10}
            onClick={() =>
              form.insertListItem("attributes", {
                name: "",
                description: "",
                attributeOptions: [],
              })
            }
          >
            +
          </Button>
          <Group position="right" mt="md">
            <Button type="submit" loading={productLoading}>
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>{data.products.data.length} Products</p>
        <button style={{ cursor: "pointer" }} onClick={() => setOpened(true)}>
          ADD PRODUCT +
        </button>
      </div>
      {!data.products.data.length && (
        <div style={{ width: "80%", marginInline: "auto" }}>
          <Card
            mt={50}
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            style={{ textAlign: "center" }}
          >
            <h1>There are currently no products in this store.</h1>
            <br />
            <p>
              Click the "add product" button on the top right corner to add a
              new product
            </p>
          </Card>
        </div>
      )}
    </>
  );
}

export default Products;
