import { HomeFilledIcon, LocationFilledIcon, PersonFilledIcon } from "@shopify/polaris-icons";

export const routes = [
  {
    path: "/",
    exact: true,
    title: "Home",
    Icon: HomeFilledIcon,
  },
  {
    path: "/account",
    title: "Account",
    Icon: PersonFilledIcon,

  },
  {
    path: "/address",
    title: "Addresses",
    Icon: LocationFilledIcon,

  },
];
