import { configureStore } from "@reduxjs/toolkit";
import addressesReducer from "./features/addresses/addressesSlice";
import accountsReducer from "./features/accounts/accountsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      addresses: addressesReducer,
      accounts: accountsReducer,
    },
  });
};
