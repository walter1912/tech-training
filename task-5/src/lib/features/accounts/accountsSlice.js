import { createSlice } from "@reduxjs/toolkit";
import { getFirstLetters, toCapitalize } from "~/utils/functions";
const initialState = {
  infor: {
    fullname: "",
    email: "",
    shortname: "",
  },
};
export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setInfor: (state, action) => {
      const data = action.payload;
      let newData = {
        shortname: "",
        ...data,
      };
      if (data.fullname && data.fullname.trim() !== "") {
        newData = {
          ...newData,
          shortname: getFirstLetters(data.fullname),
          fullname: toCapitalize(data.fullname),
        };
      }
      state.infor = newData;
    },
  },
});

export const accountsActions = accountsSlice.actions;

export default accountsSlice.reducer;
