import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async () => {
    const data = await api.getInventory();
    return data.map((item: Product) => ({
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      disabled: false,
    }));
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    products: [] as Product[],
    loading: true,
    error: null as string | null,
  },
  reducers: {
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    toggleProductStatus: (state, action: PayloadAction<string>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.disabled = !product.disabled;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch inventory";
      });
  },
});

export const { deleteProduct, updateProduct, toggleProductStatus } =
  inventorySlice.actions;
export default inventorySlice.reducer;
