import {
  addNewItemToFavourite,
  deleteItemToFavourite,
  getFavourite,
} from "../api/favourite";
import { Product } from "../types/Bucket";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { FavouritePageMessages } from "../shared/utils/modalMessages";

export type FavouriteState = {
  favourite: Product[];
  loading: boolean;
  messages: FavouritePageMessages | null;
};

const initialState: FavouriteState = {
  favourite: [],
  loading: false,
  messages: null,
};

export const fetchFavourite = createAsyncThunk<Product[], void>(
  "products/fetchFavourite",
  async () => {
    const favourite = await getFavourite();
    return favourite;
  }
);

type addNewItemFavourite =
  | { item: Product; action: "removed" }
  | { item: Product; action: "added" };

export const toggleItemInFavourite = createAsyncThunk<
  addNewItemFavourite,
  number,
  { rejectValue: string }
>("favourite/toggleItem", async (id, { getState, rejectWithValue }) => {
  const state = getState() as RootState;
  const items = state.favourite.favourite;

  const existingItem = items?.find((item) => item.id === id);

  try {
    if (existingItem) {
      await deleteItemToFavourite(existingItem.id);
      return { item: existingItem, action: "removed" };
    } else {
      const newItem: Product = await addNewItemToFavourite(id);
      console.log(newItem);
      return { item: newItem, action: "added" };
    }
  } catch (error) {
    return rejectWithValue("error");
  }
});

type deleteItemResult = { id: number; action: "removed" };

export const deleteItemInFavourite = createAsyncThunk<deleteItemResult, number>(
  "favourite/deleteItem",
  async (id) => {
    try {
      await deleteItemToFavourite(id);

      return { id: id, action: "removed" };
    } catch (error) {
      throw error;
    }
  }
);

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourite.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchFavourite.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.favourite = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchFavourite.rejected, (state) => {
        state.loading = false;
        state.messages = FavouritePageMessages.FETCH_FAVOURITE_ERROR;
      })
      .addCase(deleteItemInFavourite.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteItemInFavourite.fulfilled,
        (state, action: PayloadAction<deleteItemResult>) => {
          state.favourite =
            state.favourite?.filter(
              (product) => product.id !== action.payload.id
            ) || [];
          state.loading = false;
        }
      )
      .addCase(deleteItemInFavourite.rejected, (state) => {
        state.loading = false;
        state.messages = FavouritePageMessages.DELETE_FAVOURITE_ERROR;
      })
      .addCase(toggleItemInFavourite.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        toggleItemInFavourite.fulfilled,
        (state, action: PayloadAction<addNewItemFavourite>) => {
          state.loading = false;
          const { item, action: itemAction } = action.payload;

          if (state.favourite) {
            if (itemAction === "added") {
              state.favourite.push(item);
            } else if (itemAction === "removed") {
              state.favourite = state.favourite.filter(
                (favItem) => favItem.id !== item.id
              );
            }
          } else {
            state.favourite = itemAction === "added" ? [item] : [];
          }
        }
      )
      .addCase(toggleItemInFavourite.rejected, (state) => {
        state.loading = false;
        state.messages = FavouritePageMessages.TOGGLE_FAVOURITE_ERROR;
      });
  },
});

export const favouriteReducer = favouriteSlice.reducer;
