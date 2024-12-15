import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortOptions, SortOrder } from "../types/SortOptions";

export interface ParamsState {
  selectedCategories: number[];
  selectedProducers: number[];
  selectedSizes: number[];
  selectedGenders: number[];
  selectedSort: SortOptions;
  priceRange: [number, number];
  currentPage: number;
  name: string | null;
  isNew: boolean;
  onDiscount: boolean;
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
  currentPage: 1,
  name: "",
  isNew: false,
  onDiscount: false,
};

const loadFromUrl = (
  params: URLSearchParams,
  defaultState: ParamsState
): ParamsState => {
  const categoriesIds = params.getAll("categoryIds").map(Number);
  const producersIds = params.getAll("producerIds").map(Number);
  const sizesIds = params.getAll("sizeIds").map(Number);
  const gendersIds = params.getAll("genderIds").map(Number);
  const name = params.get("name");

  const isNew =
    params.get("isNew") === "true"
      ? true
      : params.get("isNew") === "false"
      ? false
      : undefined;
  const onDiscount =
    params.get("onDiscount") === "true"
      ? true
      : params.get("onDiscount") === "false"
      ? false
      : undefined;

  const priceRange: [number, number] = [
    Number(params.get("minPrice") || 0),
    Number(params.get("maxPrice") || 10000),
  ];

  const sortField =
    params.get("sortField") || defaultState.selectedSort.sortField;

  const sortOrder: SortOrder =
    (params.get("sortOrder") as SortOrder) ||
    defaultState.selectedSort.sortOrder;

  return {
    ...defaultState,
    selectedCategories: categoriesIds,
    selectedProducers: producersIds,
    selectedSizes: sizesIds,
    selectedGenders: gendersIds,
    priceRange,
    selectedSort: { sortField, sortOrder },
    name,
    isNew: isNew ?? defaultState.isNew,
    onDiscount: onDiscount ?? defaultState.onDiscount,
  };
};

const params = new URLSearchParams(window.location.search);
const loadedState: ParamsState = loadFromUrl(params, initialState);

console.log(params);
console.log(loadedState);

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
    },
    toggleSize(state, action: PayloadAction<number>) {
      const sizeId = action.payload;

      if (state.selectedSizes.includes(sizeId)) {
        state.selectedSizes = state.selectedSizes.filter((id) => id !== sizeId);
      } else {
        state.selectedSizes.push(sizeId);
      }
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
    },
    toggleSort(state, action: PayloadAction<SortOptions>) {
      state.selectedSort = action.payload;
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
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setInputSearch(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    toggleIsNew(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload !== undefined) {
        state.isNew = action.payload;
      } else {
        state.isNew = !state.isNew;
      }
    },
    toggleOnDiscount(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload !== undefined) {
        state.onDiscount = action.payload;
      } else {
        state.onDiscount = !state.onDiscount;
      }
    },
  },
});

export const {
  toggleCategory,
  toggleProducer,
  toggleSize,
  toggleGender,
  toggleSort,
  toggleIsNew,
  toggleOnDiscount,
  setFiltersFromUrl,
  setPriceRange,
  setCurrentPage,
  setInputSearch,
} = paramsSlice.actions;

export const paramsReducer = paramsSlice.reducer;
