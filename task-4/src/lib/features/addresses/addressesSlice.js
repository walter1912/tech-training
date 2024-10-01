import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [{ address: "", city: "" }],
  address: [],
  city: [],
  table: [],
};

export const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {
    initializeAddress(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setList: (state, action) => {
      state.all = action.payload;
      console.log("change list addresses: ", action.payload);
      state.address = action.payload.map((items, index) => items.address);
      state.city = action.payload.map((items, index) => items.city);
      state.table = action.payload.map((item) => [item.address, item.city]);
    },
    addEmptyField: (state) => {
      state.address.push("");
      state.city.push("");
    },
    addField: (state, action) => {
      state.all.push(action.payload);
    },
    changeValueAddress: (state, action) => {
      const { index = 0, value = "" } = action.payload;
      state.address[index] = value;
    },
    changeValueCity: (state, action) => {
      const { index = 0, value = "" } = action.payload;
      state.city[index] = value;
    },
    deleteField: (state, action) => {
      const index = action.payload;
      let message = "";
      if (state.address[index].trim() !== "") {
        message = `Address ${index + 1} is filled`;
      }
      if (state.city[index].trim() !== "") {
        if (message === "") message = `City ${index + 1} is filled`;
        else {
          message += `, City ${index + 1} is filled`;
        }
      }
      if (message !== "") {
        let check = window.confirm(`${message}. Are u sure want to delete these fields?`);
        if (!check) return;
      }
      state.city.splice(index, 1);
      state.address.splice(index, 1);      
    },
  },
});

export const addressesActions = addressesSlice.actions;

export default addressesSlice.reducer;
