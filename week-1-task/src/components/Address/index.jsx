import React from "react";
import PropTypes from "prop-types";
import {
  BoxStyled,
  HeadingPage,
  SecondHeading,
  SectionStyled,
  TwodColSection,
} from "../custom-styled/PageLayout";
import styled from "styled-components";

Address.propTypes = {};

function Address(props) {
  const userPure = localStorage.getItem("inforAccount");
  const inforAccount = userPure ? JSON.parse(userPure) : null;
  console.log('inforAccount: ', inforAccount);
  
  const countAddressPure = localStorage.getItem("countAddress");
  const countAddressInit = countAddressPure
    ? parseInt(countAddressPure, 10)
    : 0;

  const addresses = [
    {
      address: "",
      city: "",
    },
  ];
  if (inforAccount != null)
    for (let i = 1; i <= countAddressInit; i++) {
      const addressKey = i === 1 ? "address" : `address${i}`;
      const cityKey = i === 1 ? "city" : `city${i}`;

      if (inforAccount[addressKey] !== undefined || inforAccount[cityKey] !== undefined) {
        addresses.push({
          address: inforAccount[addressKey],
          city: inforAccount[cityKey],
        });
      }
    }

  console.log("addresses: ", addresses);

  const Details = styled.div((props) => ({
    width: "100%",
    display: "flex",
    borderBottom: "1px solid var(--p-color-border)",
    "& .infor": {
      display: "flex",
      flex: 1,
      fontSize: "var(--p-font-size-450)",
      lineHeight: "40px",
      height: "40px",
      paddingLeft: "var(--p-space-300)",
    },
  }));
  return (
    <BoxStyled>
      <HeadingPage>My Addresses</HeadingPage>
      <TwodColSection>
        <div className="first-col">
          <SecondHeading>Address Details</SecondHeading>
          <p>You can click on Account menu to edit addresses</p>
        </div>
        <div className="second-col">
          <SectionStyled style={{ flexDirection: "column" }}>
            <Details>
              <div className="infor" style={{ fontWeight: "600" }}>
                Address
              </div>
              <div className="infor" style={{ fontWeight: "600" }}>
                City
              </div>
            </Details>
            {addresses.slice(0, -1).map(({ address, city }, index) => {
              if (address != "" && city != "")
                return (
                  <React.Fragment key={index + 1}>
                    <Details key={index + 1}>
                      <p className="infor">{address}</p>
                      <p className="infor">{city}</p>
                    </Details>
                  </React.Fragment>
                );
              return <></>;
            })}
            {addresses.length > 1 && (
              <Details style={{ borderBottomColor: "transparent" }}>
                <p className="infor">
                  {addresses[countAddressInit].address}
                </p>
                <p className="infor">{addresses[countAddressInit].city}</p>
              </Details>
            )}
          </SectionStyled>
        </div>
      </TwodColSection>
    </BoxStyled>
  );
}

export default Address;
