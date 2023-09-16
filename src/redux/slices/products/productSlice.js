import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrorAction,
  resetProducts,
  resetSuccessAction,
} from "../globalAction/globalAction";
const initialState = {
  product: {},
  products: [],
  loading: false,
  error: null,
  isUpdated: false,
  isAdded: false,
  isDeleted: false,
};
export const createProductAction = createAsyncThunk(
  "products/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { name, description, brand, category, sizes, colors, price, files } =
      payload;
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "multipart/form-data",
        },
      };
      //fromData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("decription", description);
      formData.append("brand", brand);
      formData.append("category", category);
      sizes.forEach((size) => {
        formData.append("sizes", size);
      });
      colors.forEach((color) => {
        formData.append("colors", color);
      });
      files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("price", price);
      const { data } = await axios.post(
        `${baseURL}/products`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response.data);
    }
  }
);

export const fetchAllProductsAction = createAsyncThunk(
  "products/fetch",
  async ({ url }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchProductAction = createAsyncThunk(
  "products/details",
  async ({ id }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    builder.addCase(fetchAllProductsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchAllProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.error = action.payload;
    });

    builder.addCase(fetchProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.error = action.payload;
    });

    builder.addCase(resetErrorAction.pending, (state, action) => {
      state.error = null;
    });
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});
const productReducer = productSlice.reducer;
export default productReducer;
