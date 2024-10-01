"use client";
import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { addressesActions } from "~/lib/features/addresses/addressesSlice";
import { useAppSelector } from "~/lib/hooks";
import { DeleteIcon, ExportIcon } from "@shopify/polaris-icons";
import { accountsActions } from "~/lib/features/accounts/accountsSlice";

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
  const { addresses, accounts } = props;

  const dispatch = useDispatch();

  // declare valid to render valid or status relevant addresses
  const [valid, setValid] = useState({ status: "none" });
  useEffect(() => {
    setTimeout(() => {
      setValid({ status: "none" });
    }, 2000);
  }, [addresses, accounts]);
  const { fields, submit } = useForm({
    fields: {
      fullname: useField({
        value: accounts.fullname,
        validates: (value) => {
          return validateTextField("Full name", value);
        },
      }),
      email: useField({
        value: accounts.email,
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
        if (res.status === 200) {
          dispatch(accountsActions.setInfor(dataAccount));
        }
        message += res.message;
      } catch (err) {
        console.error(err);
      }
      // reprocess data: combine 2 arrays to 1 array
      let dataAddress = addresses.address.map((address, index) => ({
        address,
        city: addresses.city[index],
      }));
      try {
        const res = await saveAddress(dataAddress);
        dispatch(addressesActions.setList(dataAddress));
        message = res.message;
      } catch (err) {
        console.error(err);
      }
      // if just 1 success message , we will know just 1 POST success
      setValid({
        status: "success",
        message: message,
        tone: "success",
      });
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
      dispatch(addressesActions.addEmptyField());
    }
  }

  function handleCheck(type = "addInput") {
    // type prop is a optional prop, default addInput when click "New address", this value just change to "submit" when click "Save"

    // just render 1 error and return message, avoid render many messages - time-consuming
    const validAddress = checkValidateTextField(
      "Address",
      addresses.address,
      type
    );
    setValid(validAddress);
    if (validAddress.status === "fail") return { status: "fail" };

    const validCity = checkValidateTextField("City", addresses.city, type);
    setValid(validCity);

    if (validCity.status === "fail") return { status: "fail" };
    // if no error return status success to render Banner tone="success"
    return { status: "success" };
  }
  function handleChangeAddressInp(value, index) {
    dispatch(
      addressesActions.changeValueAddress({
        index: index,
        value: value,
      })
    );
  }
  function handleChangeCityInp(value, index) {
    dispatch(
      addressesActions.changeValueCity({
        index: index,
        value: value,
      })
    );
  }

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
              <BannerStyled status={valid.status}>
                <Banner tone={valid?.tone} title={valid?.status}>
                  <Text tone={valid?.tone}>{valid?.message}</Text>
                </Banner>
              </BannerStyled>
              <TextField label="Full name" {...fields.fullname} />
              <TextField label="Email" {...fields.email} />
              {addresses.address.map((address, index) => (
                <Box key={index}>
                  <InlineGrid columns="1fr auto">
                    <Text as="h2" variant="headingSm">
                      Location {index + 1}
                    </Text>
                    <Button
                      onClick={() => {
                        dispatch(addressesActions.deleteField(index));
                      }}
                      accessibilityLabel={`Location ${index + 1}`}
                      icon={DeleteIcon}
                    />
                  </InlineGrid>
                  <TextField
                    label="Address"
                    name={`address${index}`}
                    value={addresses.address[index] || ""}
                    onChange={(value) => {
                      handleChangeAddressInp(value, index);
                    }}
                    error={addresses.address[index].trim() === ""}
                  />
                  <TextField
                    label="City"
                    name={`city${index}`}
                    value={addresses.city[index] || ""}
                    onChange={(value) => {
                      handleChangeCityInp(value, index);
                    }}
                    error={addresses.city[index].trim() === ""}
                  />
                </Box>
              ))}
            </FormLayout>
            <GroupButton>
              <Button onClick={(e) => handleNewAddress(e)}>New Address</Button>
              <Button onClick={(e) => submit(e)}>
                {addresses.all.length !== addresses.address.length
                  ? "Change"
                  : "Save"}
              </Button>
            </GroupButton>
          </Form>
        </Card>
      </InlineGrid>
    </Page>
  );
}
