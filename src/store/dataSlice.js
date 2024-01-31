import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataRedux = createAsyncThunk(
  "data/getDataRedux",
  async (url) => {
    try {
      const response = await axios.get(`${url}/data`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const reduxHandleUpdate = createAsyncThunk(
  "data/reduxHandleUpdate",
  async ({ data, orders }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:3000/data`, {
        ...data,
        orders,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: undefined,
    isLoading: false,
    sadfasdf: "safsf",
  },
  reducers: {
    // Internal application logic goes here
  },
  extraReducers: (builder) => {
    builder.addCase(getDataRedux.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(reduxHandleUpdate.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default dataSlice.reducer;
