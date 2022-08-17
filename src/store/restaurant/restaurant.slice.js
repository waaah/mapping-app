import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRestaurants, getRestaurantsOnDrag } from "../../services/places";

export const getRestaurantsByFilter = createAsyncThunk(
  "maps/getRestaurantsByFilter",
  async (filters, thunk) => {
    const response = await getRestaurants(filters);
    return response;
  }
);
export const getRestaurantsOnDragHandler = createAsyncThunk(
  "maps/getRestaurantsOnDrag",
  async (filters) => {
    const response = await getRestaurantsOnDrag(filters);
    return response;
  }
);

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: { data: [], isLoading: false, filters: {} },
  reducers: {
    setRestaurants(state, action) {
      state = action.payload;
      return state;
    },
    addFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
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
        state.isLoading = false;
      })
      .addCase(getRestaurantsByFilter.fulfilled, (state, action) => {
        // update state
        state.data = action.payload;
        state.isLoading = false;
      });
  },
});

export const { getRestaurantInfo, setRestaurants, addFilter } =
  restaurantsSlice.actions;
export default restaurantsSlice;
