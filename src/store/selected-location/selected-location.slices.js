import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: null,
  origin: null,
  restaurant: null,
  mode: null,
  directionData: null,
};

const selectedLocationSlice = createSlice({
  name: "selectedLocation",
  initialState,
  reducers: {
    selectRestaurant(state, action) {
      const { restaurant } = action.payload;
      state.restaurant = restaurant;
      state.directionData = initialState.directionData;
      state.mode = null;
      return state;
    },
    getDirections(state, action) {
      const { origin, destination, mode } = action.payload;
      state.origin = origin;
      state.destination = destination;
      state.mode = mode;
      return state;
    },
    setDirectionData(state, action) {
      if (!action.payload) {
        state.directionData = null;
      } else {
        const { estimatedTime, estimatedDistance } = action.payload;
        state.directionData = { estimatedTime, estimatedDistance };
      }
      return state;
    },
    resetState(state) {
      state = initialState;
      return state;
    },
    closeRestaurant(state) {
      state = initialState;
      return state;
    },
    resetDirectionState(state) {
      state.origin = null;
      state.destination = null;
    },
  },
});

export const {
  setDirections,
  resetState,
  selectRestaurant,
  closeRestaurant,
  getDirections,
  setDirectionData,
} = selectedLocationSlice.actions;
export default selectedLocationSlice;
