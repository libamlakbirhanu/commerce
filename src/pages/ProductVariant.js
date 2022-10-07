import { useMutation, useQuery } from "@apollo/client";

import {
  Modal,
  TextInput,
  Group,
  Button,
  Card,
  Select,
  Text,
  Paper,
  Table,
  Pagination,
  LoadingOverlay,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import {
  GET_PRODUCT_VARIANTS,
  GET_PRODUCTS,
  GET_PRODUCT_ATTRIBUTES,
  GET_PRODUCT,
} from "../graphql/queries";
import { CREATE_PRODUCT_VARIANT } from "../graphql/mutations";
import DZoneComponent from "../components/DropZone";
import uuid from "react-uuid";

function ProductVariant() {
  const [activePage, setPage] = useState(1);
  const [productSearch, setProductSearch] = useState("");
  const [opened, setOpened] = useState(false);
  const [uploadfile, setuploadfiles] = useState([]);

  const form = useForm({
    initialValues: {
      price: 0,
      description: "",
      images: [],
      product: { connect: "" },
      productVariantAttributes: {
        create: [
          {
            product: { connect: "" },
            attribute: { connect: "" },
            attributeOption: { connect: "" },
          },
        ],
      },
    },
  });

  const [
    createProductVariant,
    { data: productVariantData, loading: productVaiantLoading },
  ] = useMutation(CREATE_PRODUCT_VARIANT);
  const { data: productsData, loading: productsLoading } = useQuery(
    GET_PRODUCTS,
    {
      variables: {
        search: productSearch,
        first: 10,
        page: 1,
      },
    }
  );
  const { data: productData, loading: productLoading } = useQuery(GET_PRODUCT, {
    variables: {
      id: form.values.product.connect,
    },
  });
  const { data, loading } = useQuery(GET_PRODUCT_VARIANTS, {
    variables: {
      first: 10,
      page: activePage,
    },
  });

  const addProductVariant = (values) => {
    try {
      createProductVariant({
        variables: {
          input: {
            ...values,
            sku: uuid(),
            images: [...uploadfile],
            productVariantAttributes: {
              create: [
                ...form.values.productVariantAttributes.create.map((att) => {
                  return {
                    ...att,
                    product: { connect: form.values.product.connect },
                  };
                }),
              ],
            },
          },
        },
      });
      setOpened(false);
    } catch (err) {
      setOpened(false);
      console.log(err);
    }
  };

  const handleCProductSearch = (search) => {
    setProductSearch(search);
  };

  const attributeFields = form.values.productVariantAttributes.create.map(
    (item, index) => (
      <Card shadow="sm" p="lg" radius="md" mb={10} withBorder key={index}>
        <Select
          mb={10}
          label="Select an attribute"
          placeholder="Pick one"
          // searchable
          nothingFound="Nothing Found"
          data={
            productData &&
            productData.product &&
            productData.product.attributes.length
              ? productData.product.attributes.map((attribute) => {
                  return {
                    label: attribute.name,
                    value: attribute.id,
                  };
                })
              : []
          }
          // onKeyUp={(e) => handleproductAttributeSearch(e.target.value)}
          {...form.getInputProps(
            `productVariantAttributes.create.${index}.attribute.connect`
          )}
        />
        <Select
          mb={10}
          label="Select an option"
          placeholder="Pick one"
          // searchable
          nothingFound="Nothing Found"
          data={
            productData &&
            productData.product &&
            productData.product.attributes.length &&
            form.values.productVariantAttributes.create[index].attribute
              .connect !== ""
              ? productData.product.attributes
                  .filter(
                    (attribute) =>
                      attribute.id ===
                      form.values.productVariantAttributes.create[index]
                        .attribute.connect
                  )[0]
                  ?.attributeOptions.map((option) => {
                    return {
                      label: option.name,
                      value: option.id,
                    };
                  })
              : []
          }
          // onKeyUp={(e) => handleproductAttributeSearch(e.target.value)}
          {...form.getInputProps(
            `productVariantAttributes.create.${index}.attributeOption.connect`
          )}
        />
      </Card>
    )
  );

  return loading ? (
    <LoadingOverlay visible={loading} overlayBlur={2} />
  ) : (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          form.reset();
          setuploadfiles(null);
        }}
        title="Add product"
        size="lg"
      >
        <form onSubmit={form.onSubmit((values) => addProductVariant(values))}>
          <TextInput
            mb={10}
            withAsterisk
            label="Description"
            placeholder="store description"
            {...form.getInputProps("description")}
          />
          <NumberInput
            mb={10}
            placeholder="100.00"
            label="Price"
            withAsterisk
            {...form.getInputProps("price")}
          />
          <Select
            mb={10}
            label="Select product"
            placeholder="Pick one"
            searchable
            nothingFound="Nothing Found"
            maxDropdownHeight={250}
            data={
              productsData
                ? productsData.products.data.map((product) => {
                    return {
                      label: product.name,
                      value: product.id,
                    };
                  })
                : []
            }
            onKeyUp={(e) => handleCProductSearch(e.target.value)}
            {...form.getInputProps("product.connect")}
          />
          {attributeFields}
          <Button
            mt={10}
            onClick={() =>
              form.insertListItem("productVariantAttributes.create", {
                attribute: { connect: "" },
                attributeOption: { connect: "" },
              })
            }
          >
            +
          </Button>

          <DZoneComponent setuploadfiles={setuploadfiles} />

          <Group position="right" mt="md">
            <Button type="submit" loading={productVaiantLoading}>
              Submit
            </Button>
          </Group>
        </form>
      </Modal>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>{data.productVariants.data.length} Product Variants</p>
        <button style={{ cursor: "pointer" }} onClick={() => setOpened(true)}>
          ADD PRODUCT VARIANT +
        </button>
      </div>
      {!data.productVariants.data.length ? (
        <div style={{ width: "80%", marginInline: "auto" }}>
          <Card
            mt={50}
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            style={{ textAlign: "center" }}
          >
            <h1>There are currently no product variants in this store.</h1>
            <br />
            <p>
              Click the "add product variant" button on the top right corner to
              add a new product variant
            </p>
          </Card>
        </div>
      ) : (
        <Table
          striped
          highlightOnHover
          verticalSpacing="md"
          captionSide="bottom"
        >
          <caption>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              {activePage} of {data.productVariants.paginatorInfo.lastPage}{" "}
              pages{" "}
              <Pagination
                page={activePage}
                onChange={setPage}
                total={data.productVariants.paginatorInfo.lastPage}
              />
            </div>
          </caption>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Description</th>
              <th>SKU</th>
            </tr>
          </thead>
          <tbody>
            {data.productVariants.data.map((variant, i) => (
              <tr key={variant.id}>
                <td>{i + 1}</td>
                <td>{variant.product.name}</td>
                <td>{variant.description || "no description"}</td>
                <td>{variant.sku}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default ProductVariant;
