import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await axios.get("http://localhost:8080/users");
    return response.data;
  } catch (error) {
    if (error.response) return error.message;
  }
});

export const saveUser = createAsyncThunk(
  "users/saveUser",
  async ({ username, email, password, confirmPassword }) => {
    try {
      const response = await axios.post("http://localhost:8080/user", {
        username,
        email,
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      if (error.response) return error.message;
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, username, email, password, confirmPassword }) => {
    try {
      const response = await axios.patch(`http://localhost:8080/user/${id}`, {
        username,
        email,
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      if (error.response) return error.message;
    }
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    await axios.delete(`http://localhost:8080/user/${id}`);
    return id;
  } catch (error) {
    if (error.response) return error.message;
  }
});

const userEntity = createEntityAdapter({
  selectId: (user) => user._id,
});

const userSlice = createSlice({
  name: "users",
  initialState: userEntity.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      userEntity.setAll(state, action.payload);
    });
    builder.addCase(saveUser.fulfilled, (state, action) => {
      userEntity.addOne(state, action.payload);
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      userEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      userEntity.removeOne(state, action.payload);
    });
  },
});

export const userSelectors = userEntity.getSelectors((state) => state.user);
export default userSlice.reducer;
