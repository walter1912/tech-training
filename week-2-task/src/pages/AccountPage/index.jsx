"use client";
import React, { useCallback, useState } from "react";
import { useField, useForm } from "@shopify/react-form";

import {
  Page,
  FormLayout,
  Form,
  Card,
  TextField,
  Button,
  InlineGrid,
  Box,
  Text,
  Banner,
} from "@shopify/polaris";
import styled from "styled-components";
import { saveAccount } from "~/services/accountService";
import { saveAddress } from "~/services/addressService";

const GroupButton = styled.div((props) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  marginTop: "20px",
  "& .Polaris-Button": { marginLeft: "20px", height: "34px" },
}));

// it will change when valid state change
const BannerStyled = styled.div((props) => ({
  "& .Polaris-Banner": {
    display: props.status == "none" ? "none" : "block",
  },
}));

// use to validate form : Shopify/react-form
const validateTextField = (label, value) => {
  if (value.length === 0) {
    return `${label} is required`;
  } else if (value.trim() === "") {
    return "Please enter text";
  }
};
// use to validate form when define fields by useState
function checkValidateTextField(label, arr, type = "addInput") {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].trim() == "")
      return {
        status: "fail",
        message: `You must enter ${label} ${i + 1} field!`,
        tone: "caution",
      };
  }
  return {
    status: "success",
    message:
      type === "addInput"
        ? `Added new field, you must enter ${arr.length + 1} fields`
        : "",
    tone: "success",
  };
}

export default function AccountPage(props) {
  // set default value to avoid init state (in useState) is null => UI error
  const {
    addressInit = [{ address: "", city: "" }],
    accountInit = { fullname: "", email: "" },
  } = props;

  // declare address sperate city to handle addresses clearly.
  const [newAddress, setNewAddress] = useState(
    addressInit.map((items, index) => items.address)
  );
  const [newCity, setNewCity] = useState(
    addressInit.map((items, index) => items.city)
  );
  // declare valid to render valid or status relevant addresses
  const [valid, setValid] = useState({ status: "none" });

  const { fields, submit } = useForm({
    fields: {
      fullname: useField({
        value: accountInit.fullname,
        validates: (value) => {
          return validateTextField("Full name", value);
        },
      }),
      email: useField({
        value: accountInit.email,
        validates: (value) => {
          if (value.trim() === "") return validateTextField("Email", value);
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please provide a valid email"; // Check valid email
          }
        },
      }),
    },
    async onSubmit(form) {
      return await handleSubmit(form);
    },
  });
  // when client click "save"
  async function handleSubmit(form) {
    try {
      // check addresses fields because I declare addresses without manage form library
      const check = handleCheck("submit");
      if (check.status === "fail") return { status: "fail" };
      let message = "";
      // use 2 try...catch block to avoid if POST account error will return this function => POST addresses won't excuted
      let dataAccount = { fullname: form.fullname, email: form.email };
      try {
        const res = await saveAccount(dataAccount);
        message = res.message;
      } catch (err) {
        console.error(err);
      }
      // reprocess data: combine 2 arrays to 1 array
      let dataAddress = newAddress.map((address, index) => ({
        address,
        city: newCity[index],
      }));
      try {
        const res = await saveAddress(dataAddress);
        message = res.message;
      } catch (err) {
        console.error(err);
      }
      // if just 1 success message , we will know just 1 POST success
      window.alert(message);
      return { status: "success" };
    } catch (err) {
      console.error("err:", err);
      return { status: "fail" };
    }
  }
  function handleNewAddress(e) {
    e.preventDefault();
    const { status } = handleCheck();
    if (status === "success") {
      setNewAddress((prev) => [...prev, ""]);
      setNewCity((prev) => [...prev, ""]);
    }
  }

  function handleCheck(type = "addInput") {
    // type prop is a optional prop, default addInput when click "New address", this value just change to "submit" when click "Save"

    // just render 1 error and return message, avoid render many messages - time-consuming
    const validAddress = checkValidateTextField("Address", newAddress, type);
    setValid(validAddress);
    if (validAddress.status === "fail") return { status: "fail" };

    const validCity = checkValidateTextField("City", newCity, type);
    setValid(validCity);

    if (validCity.status === "fail") return { status: "fail" };
    // if no error return status success to render Banner tone="success"
    return { status: "success" };
  }
  const handleChangeAddress = useCallback((value, index) => {
    setNewAddress((pre) => {
      const newState = [...pre];
      newState[index] = value;
      return newState;
    });
  }, []);
  const handleChangeCity = useCallback((value, index) => {
    setNewCity((pre) => {
      const newState = [...pre];
      newState[index] = value;
      return newState;
    });
  }, []);
  return (
    <Page title="Account">
      <InlineGrid columns={["oneThird", "twoThirds"]}>
        <Box>
          <Text as="h3" variant="headingMd">
            Account Details
          </Text>
          <Text as="p">Walter will use this as your account information</Text>
        </Box>
        <Card>
          <Form onSubmit={submit}>
            <FormLayout>
              <TextField label="Full name" {...fields.fullname} />
              <TextField label="Email" {...fields.email} />
              {newCity.map((address, index) => (
                <Box key={index}>
                  <TextField
                    label={`Address ${index + 1}`}
                    name={`address${index}`}
                    value={newAddress[index] || ""}
                    onChange={(value) => handleChangeAddress(value, index)}
                    error={newAddress[index].trim() === ''}
                  />
                  <TextField
                    label={`City ${index + 1}`}
                    name={`city${index}`}
                    value={newCity[index] || ""}
                    onChange={(value) => handleChangeCity(value, index)}
                    error={newCity[index].trim() === ''}
                  />
                </Box>
              ))}
              <BannerStyled status={valid.status}>
                <Banner tone={valid?.tone} title={valid?.status}>
                  <Text tone={valid?.tone}>{valid?.message}</Text>
                </Banner>
              </BannerStyled>
            </FormLayout>
            <GroupButton>
              <Button onClick={(e) => handleNewAddress(e)}>New Address</Button>
              <Button onClick={(e) => submit(e)}>Save</Button>
            </GroupButton>
          </Form>
        </Card>
      </InlineGrid>
    </Page>
  );
}
