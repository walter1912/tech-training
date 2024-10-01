import styled from "styled-components";
import { Box } from "@shopify/polaris";

//  when I use more Polaris component: Page, Grid, Layout, these styled-components is not necesary 
export const BoxStyled = styled(Box)((props) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "1rem 3rem",
}));

export const HeadingPage = styled.h2((props) => ({
  fontSize: "24px",
  fontWeight: 600,
  marginTop: "10px",
}));

export const SecondHeading = styled.h3((props) => ({
  fontSize: "14px",
  fontWeight: 600,
  marginTop: "10px",
}));

export const SectionStyled = styled.div((props) => ({
  width: props.width ?? "600px",
  backgroundColor: "var(--p-color-bg-surface)",
  borderRadius: "var(--p-border-radius-100)",
  padding: "10px",
  shadow: "var(--p-shadow-bevel-100)",
  display: "flex",
  marginBottom: "20px",
  border: ".5px solid var(--p-color-border)",
}));

export const TwodColSection = styled.div((props) => ({
  display: "flex",
  flex: 1,
  "& .first-col": {
    display: "flex",
    width: props.firstColWidth ?? "240px",
    flexDirection: "column",
  },
  "& .second-col": {
    display: "flex",
    flex: 1,
    padding: "0 10px",
    width: props.secondColWidth ?? "100%",
  },
}));
