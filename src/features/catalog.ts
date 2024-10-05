import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCategories } from "../api/categories";
import { getProducers } from "../api/producers";
import { getSizes } from "../api/sizes";
import { getGenders } from "../api/genders";

export interface Item {
  id: number;
  name: string;
}

export interface FiltersState {
  categories: Item[];
  producers: Item[];
  sizes: Item[];
  genders: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
  isLoading: boolean;
}

const initialState: FiltersState = {
  categories: [],
  producers: [],
  sizes: [],
  genders: [],
  status: "idle",
  error: "",
  isLoading: false,
};

interface FetchFilterDataResponse {
  categories: Item[];
  producers: Item[];
  sizes: Item[];
  genders: Item[];
}

export const fetchFilterData = createAsyncThunk<FetchFilterDataResponse>(
  "filters/fetchFilterData",
  async () => {
    const [categories, producers, sizes, genders] = await Promise.all([
      getCategories(),
      getProducers(),
      getSizes(),
      getGenders(),
    ]);

    return { categories, producers, sizes, genders };
  }
);

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterData.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(
        fetchFilterData.fulfilled,
        (state, action: PayloadAction<FetchFilterDataResponse>) => {
          state.status = "succeeded";
          state.isLoading = false;
          state.categories = action.payload.categories;
          state.producers = action.payload.producers;
          state.sizes = action.payload.sizes;
          state.genders = action.payload.genders;
        }
      )
      .addCase(fetchFilterData.rejected, (state) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = "Error!";
      });
  },
});

export const {} = filterSlice.actions;

export const catalogReducer = filterSlice.reducer;
