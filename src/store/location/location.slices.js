import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    destination: null,
    origin: null,
  },
  reducers: {
    setLocationState(state, action) {
      const { origin, destination } = action.payload;
      state.origin = origin;
      state.destination = destination;
      return state;
    },
    resetLocationState(state) {
      state.origin = null;
      state.destination = null;
      return state;
    },
  },
});

export const { setLocationState } = locationSlice.actions;
export default locationSlice;
