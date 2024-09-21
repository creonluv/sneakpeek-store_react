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
  selectedCategories: Set<number>;
  selectedProducers: Set<number>;
  selectedSizes: Set<number>;
  selectedGenders: Set<number>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
  isLoading: boolean;
}

const initialState: FiltersState = {
  categories: [],
  producers: [],
  sizes: [],
  genders: [],
  selectedCategories: new Set(),
  selectedProducers: new Set(),
  selectedSizes: new Set(),
  selectedGenders: new Set(),
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
  reducers: {
    toggleCategory(state, action: PayloadAction<number>) {
      const categoryId = action.payload;
      if (state.selectedCategories.has(categoryId)) {
        state.selectedCategories.delete(categoryId);
      } else {
        state.selectedCategories.add(categoryId);
      }
    },
    toggleProducer(state, action: PayloadAction<number>) {
      const producerId = action.payload;
      if (state.selectedProducers.has(producerId)) {
        state.selectedProducers.delete(producerId);
      } else {
        state.selectedProducers.add(producerId);
      }
    },
    toggleSize(state, action: PayloadAction<number>) {
      const sizeId = action.payload;
      if (state.selectedSizes.has(sizeId)) {
        state.selectedSizes.delete(sizeId);
      } else {
        state.selectedSizes.add(sizeId);
      }
    },
    toggleGender(state, action: PayloadAction<number>) {
      const genderId = action.payload;
      if (state.selectedGenders.has(genderId)) {
        state.selectedGenders.delete(genderId);
      } else {
        state.selectedGenders.add(genderId);
      }
    },
    setFiltersFromUrl(
      state,
      action: PayloadAction<{
        categories: Set<number>;
        producers: Set<number>;
        sizes: Set<number>;
        genders: Set<number>;
      }>
    ) {
      const { categories, producers, sizes, genders } = action.payload;
      state.selectedCategories = categories;
      state.selectedProducers = producers;
      state.selectedSizes = sizes;
      state.selectedGenders = genders;
    },
  },
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

export const {
  toggleCategory,
  toggleProducer,
  toggleSize,
  toggleGender,
  setFiltersFromUrl,
} = filterSlice.actions;
export const catalogReducer = filterSlice.reducer;
