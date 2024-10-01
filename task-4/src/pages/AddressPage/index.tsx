"use client";
import React from "react";
import { Box, Card, DataTable, InlineGrid, Page, Text } from "@shopify/polaris";
import styled from "styled-components";
AddressPage.propTypes = {};

// wrap to styles DataTable
const TableStyled = styled(Box)(() => ({
  "& .Polaris-DataTable__Cell": {
    textTransform: "capitalize",
    fontSize: "18px",
  },
  "& thead .Polaris-DataTable__Cell": {
    fontWeight: 600,
  },
}));

function AddressPage(props: {
  addressesTable: Array<Array<string>>
}) {
  const { addressesTable = [["", ""]] } = props;
  
  return (
    <Page title="Address">
      <InlineGrid columns={["oneThird", "twoThirds"]}>
        <Box>
          <Text as="h3" variant="headingMd">
            Address Details
          </Text>
          <Text as="p">Your addresses have been save</Text>
        </Box>
        <Card>
          <TableStyled>
            <DataTable
              columnContentTypes={["text", "text"]}
              headings={["Address", "City"]}
              rows={addressesTable}
            />
          </TableStyled>
        </Card>
      </InlineGrid>
    </Page>
  );
}

export default AddressPage;
