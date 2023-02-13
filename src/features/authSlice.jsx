import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../components/services/helper";

const initialState = {
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

//req API
export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/me`);
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const LogoutUser = createAsyncThunk("user/LogoutUser", async () => {
  await axios.delete(`${BASE_URL}/logout`);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });

    //get me/user
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
