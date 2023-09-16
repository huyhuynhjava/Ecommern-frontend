import { createAsyncThunk } from "@reduxjs/toolkit";
export const resetErrorAction = createAsyncThunk("resetErr-Action", () => {
  return {};
});
export const resetSuccessAction = createAsyncThunk(
  "resetSuccess-Action",
  () => {
    return {};
  }
);
export const resetProducts = createAsyncThunk("resetProducts-Action", () => {
  return {};
});
