import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
const initialState = {
  brand: {},
  brands: [],
  loading: false,
  error: null,
  isUpdated: false,
  isAdded: false,
  isDeleted: false,
};
export const createBrandAction = createAsyncThunk(
  "brand/create",
  async ({ name }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: `Bearer ${token}`,
      };
      const { data } = axios.post(`${baseURL}/brands`, { name }, config);
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchBrandsAction = createAsyncThunk(
  "brand/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/brands`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const brandSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createBrandAction.pending, (state, action) => {
      action.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //brand fetch
    builder.addCase(fetchBrandsAction.pending, (state, action) => {
      action.loading = true;
    });
    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchBrandsAction.rejected, (state, action) => {
      state.loading = false;
      state.brands = null;
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});
const brandReducer = brandSlice.reducer;
export default brandReducer;
