import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRestaurants } from "../../services/places";

// First, create the thunk
const getRestaurantsByFilter = createAsyncThunk(
  "maps/getRestaurantsByFilter",
  async (filters) => {
    const response = await getRestaurants(filters);
    return response;
  }
);

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: { data: [], isLoading: false },
  reducers: {
    setRestaurants(state, action) {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    builder
      .addCase(getRestaurantsByFilter.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getRestaurantsByFilter.rejected, (state, action) => {
        state.data = [];
      })
      .addCase(getRestaurantsByFilter.fulfilled, (state, action) => {
        // update state
        state.data = action.payload;
        state.isLoading = false;
      });
  },
});

export const { getRestaurantInfo, setRestaurants } = restaurantsSlice.actions;
export { getRestaurantsByFilter };
export default restaurantsSlice;
