import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
const initialState = {
  color: {},
  colors: [],
  loading: false,
  error: null,
  isUpdated: false,
  isAdded: false,
  isDeleted: false,
};
export const createcolorAction = createAsyncThunk(
  "color/create",
  async ({ name }, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: `Bearer ${token}`,
      };
      const { data } = axios.post(`${baseURL}/colors`, { name }, config);
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchcolorsAction = createAsyncThunk(
  "color/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/colors`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const colorSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createcolorAction.pending, (state, action) => {
      action.loading = true;
    });
    builder.addCase(createcolorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createcolorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //categori fetch
    builder.addCase(fetchcolorsAction.pending, (state, action) => {
      action.loading = true;
    });
    builder.addCase(fetchcolorsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchcolorsAction.rejected, (state, action) => {
      state.loading = false;
      state.colors = null;
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});
const colorReducer = colorSlice.reducer;
export default colorReducer;
