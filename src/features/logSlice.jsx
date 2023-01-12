import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getLogs = createAsyncThunk("logs/getLogs", async () => {
  try {
    const response = await axios.get("http://localhost:8080/logs");
    return response.data;
  } catch (error) {
    if (error.response) return error.message;
  }
});

export const saveLog = createAsyncThunk(
  "logs/saveLogs",
  async ({ book, member, loanDate, returnDate }) => {
    try {
      const response = await axios.post("http://localhost:8080/log", {
        book,
        member,
        loanDate,
        returnDate,
      });
      return response.data;
    } catch (error) {
      if (error.response) return error.message;
    }
  }
);

export const deleteLog = createAsyncThunk("logs/deleteLog", async (id) => {
  try {
    await axios.delete(`http://localhost:8080/log/${id}`);
    return id;
  } catch (error) {
    if (error.response) return error.message;
  }
});

const logEntity = createEntityAdapter({
  selectId: (log) => log._id,
});

const logSlice = createSlice({
  name: "logs",
  initialState: logEntity.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getLogs.fulfilled, (state, action) => {
      logEntity.setAll(state, action.payload);
    });
    builder.addCase(saveLog.fulfilled, (state, action) => {
      logEntity.addOne(state, action.payload);
    });
    builder.addCase(deleteLog.fulfilled, (state, action) => {
      logEntity.removeOne(state, action.payload);
    });
  },
});

export const logSelectors = logEntity.getSelectors((state) => state.log);
export default logSlice.reducer;
