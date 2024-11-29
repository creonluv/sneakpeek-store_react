import { RootState } from "../app/store";
import {
  addNewItemToBucket,
  deleteNewItemInBucket,
  getBucket,
  updateNewItemToBucket,
} from "../api/bucket";
import {
  Bucket,
  CartItem,
  UpdateItemInBucketPayload,
  itemInBucket,
} from "../types/Bucket";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BucketPageMessages } from "../shared/utils/modalMessages";

export type BucketState = {
  bucket: Bucket | null;
  loading: boolean;
  messages: BucketPageMessages | null;
};

const initialState: BucketState = {
  bucket: null,
  loading: false,
  messages: null,
};

export const fetchBucket = createAsyncThunk<Bucket, void>(
  "products/fetchBucket",
  async () => {
    const bucket = await getBucket();
    return bucket;
  }
);

type ToggleItemResult =
  | { id: number; action: "removed" }
  | { item: CartItem; action: "added" }
  | "error";

export const toggleItemInBucket = createAsyncThunk<
  ToggleItemResult,
  itemInBucket,
  { rejectValue: string }
>("bucket/toggleItem", async (data, { getState, rejectWithValue }) => {
  const state = getState() as RootState;
  const items = state.bucket.bucket?.cart_items;

  const existingItem = items?.find(
    (item) => item.product_instance.id === data.product_instance_id
  );

  try {
    if (existingItem) {
      await deleteNewItemInBucket(state.bucket.bucket?.id, existingItem.id);
      return { id: existingItem.id, action: "removed" };
    } else {
      const newItem: CartItem = await addNewItemToBucket(
        state.bucket.bucket?.id,
        data
      );

      return { item: newItem, action: "added" };
    }
  } catch (error) {
    return rejectWithValue("error");
  }
});

type UpdateItemResult = { item: CartItem; action: "updated" } | "error";

export const updateItemInBucket = createAsyncThunk<
  UpdateItemResult,
  UpdateItemInBucketPayload,
  { rejectValue: string }
>("bucket/updateItem", async (data, { getState, rejectWithValue }) => {
  const state = getState() as RootState;
  const items = state.bucket.bucket?.cart_items;

  const existingItem = items?.find(
    (item) => item.product_instance.id === data.product_instance_id
  );

  try {
    const updatedItem: CartItem = await updateNewItemToBucket(
      state.bucket.bucket?.id,
      existingItem?.id,
      data
    );

    return { item: updatedItem, action: "updated" };
  } catch (error) {
    return rejectWithValue("error");
  }
});

type deleteItemResult = { id: number; action: "removed" } | "error";

export const deleteItemInBucket = createAsyncThunk<deleteItemResult, number>(
  "bucket/deleteItem",
  async (id, { getState }) => {
    const state = getState() as RootState;

    try {
      await deleteNewItemInBucket(state.bucket.bucket?.id, id);

      return { id: id, action: "removed" };
    } catch (error) {
      console.error("Помилка під час видалення продуктів:", error);
      throw error;
    }
  }
);

export const bucketSlice = createSlice({
  name: "bucket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBucket.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchBucket.fulfilled,
        (state, action: PayloadAction<Bucket>) => {
          state.bucket = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchBucket.rejected, (state) => {
        state.loading = false;
        state.messages = BucketPageMessages.FETCH_BUCKET_ERROR;
      })
      .addCase(toggleItemInBucket.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        toggleItemInBucket.fulfilled,
        (state, action: PayloadAction<ToggleItemResult>) => {
          state.loading = false;

          if (action.payload === "error") {
            state.messages = BucketPageMessages.TOGGLE_BUCKET_ERROR;
          } else if (action.payload.action === "added") {
            const newItem = action.payload.item;
            if (state.bucket && state.bucket.cart_items) {
              state.bucket.cart_items.push(newItem);
            }
            state.messages = BucketPageMessages.TOGGLE_BUCKET_SUCCESS;
          } else if (action.payload.action === "removed") {
            const itemId = action.payload.id;
            if (state.bucket && state.bucket.cart_items) {
              state.bucket.cart_items = state.bucket.cart_items.filter(
                (item) => item.id !== itemId
              );
            }
          }
        }
      )
      .addCase(toggleItemInBucket.rejected, (state) => {
        state.loading = false;
        state.messages = BucketPageMessages.TOGGLE_BUCKET_ERROR;
      })
      .addCase(updateItemInBucket.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateItemInBucket.fulfilled,
        (state, action: PayloadAction<UpdateItemResult>) => {
          state.loading = false;

          if (action.payload === "error") {
            state.messages = BucketPageMessages.UPDATE_BUCKET_ERROR;
          } else if (action.payload.action === "updated") {
            const updatedItem = action.payload.item;

            if (state.bucket && state.bucket.cart_items) {
              const index = state.bucket.cart_items.findIndex(
                (item) => item.id === updatedItem.id
              );

              if (index !== -1) {
                state.bucket.cart_items[index] = updatedItem;
              }
            }
          }
        }
      )
      .addCase(updateItemInBucket.rejected, (state) => {
        state.loading = false;
        state.messages = BucketPageMessages.UPDATE_BUCKET_ERROR;
      })

      .addCase(deleteItemInBucket.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteItemInBucket.fulfilled,
        (state, action: PayloadAction<deleteItemResult>) => {
          state.loading = false;

          if (action.payload === "error") {
            state.messages = BucketPageMessages.DELETE_BUCKET_ERROR;
          } else if (action.payload.action === "removed") {
            const itemId = action.payload.id;

            if (state.bucket && state.bucket.cart_items) {
              state.bucket.cart_items = state.bucket.cart_items.filter(
                (item) => item.id !== itemId
              );
            }
          }
        }
      )
      .addCase(deleteItemInBucket.rejected, (state) => {
        state.loading = false;
        state.messages = BucketPageMessages.DELETE_BUCKET_ERROR;
      });
  },
});

export const bucketReducer = bucketSlice.reducer;
