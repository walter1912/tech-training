import Account from "~/components/Account";
import Address from "~/components/Address";
import HomePage from "~/pages/HomePage";

export const routes = [
    {
      path: "/",
      exact: true,
      title: "Home",
      main: <HomePage />
    },
    {
      path: "/account",
      title: "Account",
      main: <Account />
    },
    {
      path: "/address",
      title: "Addresses",
      main: <Address />
    }
  ];