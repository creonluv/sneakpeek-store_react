import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortOptions } from "../types/SortOptions";

export interface ParamsState {
  selectedCategories: number[];
  selectedProducers: number[];
  selectedSizes: number[];
  selectedGenders: number[];
  selectedSort: SortOptions;
  priceRange: [number, number];
}

const initialState: ParamsState = {
  selectedCategories: [],
  selectedProducers: [],
  selectedSizes: [],
  selectedGenders: [],
  selectedSort: {
    sortField: "name",
    sortOrder: "asc",
  },
  priceRange: [0, 10000],
};

const loadFromLocalStorage = (defaultState: ParamsState): ParamsState => {
  const savedParams = localStorage.getItem("filterParams");
  return savedParams ? JSON.parse(savedParams) : defaultState;
};

const loadedState: ParamsState = loadFromLocalStorage(initialState);

const paramsSlice = createSlice({
  name: "params",
  initialState: loadedState,
  reducers: {
    toggleCategory(state, action: PayloadAction<number>) {
      const categoryId = action.payload;
      if (state.selectedCategories.includes(categoryId)) {
        state.selectedCategories = state.selectedCategories.filter(
          (id) => id !== categoryId
        );
      } else {
        state.selectedCategories.push(categoryId);
      }
      saveToLocalStorage(state);
    },
    toggleProducer(state, action: PayloadAction<number>) {
      const producerId = action.payload;
      if (state.selectedProducers.includes(producerId)) {
        state.selectedProducers = state.selectedProducers.filter(
          (id) => id !== producerId
        );
      } else {
        state.selectedProducers.push(producerId);
      }
      saveToLocalStorage(state);
    },
    toggleSize(state, action: PayloadAction<number>) {
      const sizeId = action.payload;
      if (state.selectedSizes.includes(sizeId)) {
        state.selectedSizes = state.selectedSizes.filter((id) => id !== sizeId);
      } else {
        state.selectedSizes.push(sizeId);
      }
      saveToLocalStorage(state);
    },
    toggleGender(state, action: PayloadAction<number>) {
      const genderId = action.payload;
      if (state.selectedGenders.includes(genderId)) {
        state.selectedGenders = state.selectedGenders.filter(
          (id) => id !== genderId
        );
      } else {
        state.selectedGenders.push(genderId);
      }
      saveToLocalStorage(state);
    },
    toggleSort(state, action: PayloadAction<SortOptions>) {
      state.selectedSort = action.payload;
      saveToLocalStorage(state);
    },
    setFiltersFromUrl(
      state,
      action: PayloadAction<{
        categoriesIds: number[];
        producersIds: number[];
        sizesIds: number[];
        gendersIds: number[];
      }>
    ) {
      const { categoriesIds, producersIds, sizesIds, gendersIds } =
        action.payload;
      state.selectedCategories = categoriesIds;
      state.selectedProducers = producersIds;
      state.selectedSizes = sizesIds;
      state.selectedGenders = gendersIds;
      saveToLocalStorage(state);
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
      saveToLocalStorage(state);
    },
  },
});

const saveToLocalStorage = (state: ParamsState) => {
  localStorage.setItem("filterParams", JSON.stringify(state));
};

export const {
  toggleCategory,
  toggleProducer,
  toggleSize,
  toggleGender,
  toggleSort,
  setFiltersFromUrl,
  setPriceRange,
} = paramsSlice.actions;

export const paramsReducer = paramsSlice.reducer;
