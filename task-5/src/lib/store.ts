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
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']