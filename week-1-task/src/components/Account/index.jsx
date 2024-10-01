import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Button, Text, TextField } from "@shopify/polaris";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  BoxStyled,
  HeadingPage,
  SecondHeading,
  SectionStyled,
  TwodColSection,
} from "../custom-styled/PageLayout";
import { memo } from "react";

const schema = yup
  .object({
    fullname: yup.string().required(),
    email: yup.string().email("Email is validated").required(),
    address: yup.string().required(),
    city: yup.string().required(),
  })
  .required();

function Account(props) {
  const { setFullname } = props;
  const userPure = localStorage.getItem("inforAccount");
  const user = userPure ? JSON.parse(userPure) : null;

  const countAddressPure = localStorage.getItem("countAddress");
  const countAddressInit = countAddressPure
    ? parseInt(countAddressPure, 10)
    : 2;
  const [countAddress, addInpAddress] = useState(countAddressInit + 1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: user ?? {},
    resolver: yupResolver(schema),
  });
  // hàm onchange cho input
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValue(name, value); // Cập nhật giá trị vào react-hook-form
      console.log(`Value changed for ${name}: ${value}`);
    },
    [setValue]
  );
  // hàm submit form
  const onSubmit = (data) => {
    console.log(data);
    const userChoice = window.confirm(`Are you sure save this information? ${JSON.stringify(data)}`);

    if (userChoice) {
      // Người dùng chọn OK (có nghĩa là "Lưu thông tin")
      localStorage.removeItem("inforAccount");
      localStorage.setItem("inforAccount", JSON.stringify(data));
      setFullname(data.fullname);
      let saveCount = 1;
      for (let i = 2; i <= countAddress; i++) {
        if (data[`address${i}`].trim() !== "" || data[`city${i}`].trim() !== "")
          saveCount = i;
      }
      localStorage.removeItem("countAddress");
      localStorage.setItem("countAddress", saveCount.toString());
      window.alert("Your information have been saved!")
    } else {
      // Người dùng chọn Cancel (có nghĩa là "Không lưu thông tin")
      console.log("Thông tin không được lưu.");
    }
  };

  return (
    <BoxStyled>
      <HeadingPage>Account</HeadingPage>
      <TwodColSection>
        <div className="first-col">
          <SecondHeading>Account Details</SecondHeading>
          <p>Walter will use this as your account information</p>
        </div>
        <div className="second-col">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="items-column-center"
          >
            <SectionStyled style={{ flexDirection: "column" }}>
              <InputText
                label={"Full name"}
                name={"fullname"}
                onChange={handleChange} 
                register={register("fullname")}
                message={errors.fullname?.message ?? ""}
              />
              <InputText
                label={"Email"}
                name={"email"}
                register={register("email")}
                message={errors.email?.message}
              />
            </SectionStyled>

            <SectionStyled style={{ flexDirection: "column" }}>
              <InputText
                label={"Address(1)"}
                name={"address"}
                register={register("address")}
                message={errors.address?.message}
              />
        
              <InputText
                label={"City(1)"}
                name={"city"}
                register={register("city")}
                message={errors.city?.message}
              />
              {Array.from({ length: countAddress - 1 }, (_, index) => (
                <React.Fragment key={index + 2}>
                  <InputText
                    label={`Address(${index + 2})`}
                    name={`address${index + 2}`}
                    register={register(`address${index + 2}`)}
                  />
                  <InputText
                    label={`City(${index + 2})`}
                    name={`city${index + 2}`}
                    register={register(`city${index + 2}`)}
                  />
                </React.Fragment>
              ))}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                  height: "32px",
                }}
              >
                <Button
                  onClick={() => {
                    addInpAddress((pre) => pre + 1);
                  }}
                  
                >
                  New Address
                </Button>
                <Button variant="primary" tone="success" submit>
                  {" "}
                  Save
                </Button>
              </div>
            </SectionStyled>
          </form>
        </div>
      </TwodColSection>
    </BoxStyled>
  );
}

export default Account;

function InputText({ label, name, message = "", onChange = ()=>{}, register }) {
  const InputText = styled.div((props) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    margintop: "20px",
    fontSize: "16px",
  }));
  const LabelStyled = styled.label((props) => ({
    height: "40px",
  }));
  const InputStyled = styled.input((props) => ({
    width: "100%",
    height: "40px",
    lineHeight: "40px",
    paddingLeft: "12px",
    border: "1.5px solid var(--p-color-border)",
    borderRadius: "var(--p-border-radius-100)",
  }));
console.log("error: ", message);

  return (
    <InputText>
      <LabelStyled htmlFor={name}>{label}</LabelStyled>
      <InputStyled
        {...register}
        onChange={onChange} 
      />
      <Text as="span" tone="critical">
        {message}
      </Text>
    </InputText>
  );
}
