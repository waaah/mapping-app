import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: null,
  origin: null,
  restaurant: null,
};

const selectedLocationSlice = createSlice({
  name: "selectedLocation",
  initialState,
  reducers: {
    selectRestaurant(state, action) {
      const { restaurant } = action.payload;
      state.restaurant = restaurant;
      return state;
    },

    setOriginAndDestination(state, action) {
      const { origin, destination } = action.payload;
      state.origin = origin;
      state.destination = destination;
      return state;
    },
    resetState(state) {
      state = initialState;
      return state;
    },
    closeRestaurant(state) {
      state.restaurant = null;
      state.origin = null;
      state.destination = null;
      return state;
    },
  },
});

export const {
  setOriginAndDestination,
  resetState,
  selectRestaurant,
  closeRestaurant,
} = selectedLocationSlice.actions;
export default selectedLocationSlice;
