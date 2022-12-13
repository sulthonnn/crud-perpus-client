import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getCirculations = createAsyncThunk(
  "circulations/getCirculations",
  async () => {
    try {
      const response = await axios.get("http://localhost:8080/circulations");
      return response.data;
    } catch (error) {
      if (error.response) return error.message;
    }
  }
);

export const saveCirculation = createAsyncThunk(
  "circulations/saveCirculation",
  async ({ book, member, loanDate }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/add-circulation",
        {
          book,
          member,
          loanDate,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) return error.message;
    }
  }
);

export const updateCirculation = createAsyncThunk(
  "circulations/updateCirculation",
  async ({ id, book, member, loanDate }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/circulation/${id}`,
        {
          book,
          member,
          loanDate,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) return error.message;
    }
  }
);

export const deleteCirculation = createAsyncThunk(
  "circulations/deleteCirculation",
  async (id) => {
    try {
      await axios.delete(`http://localhost:8080/delete-circulation/${id}`);
      return id;
    } catch (error) {
      if (error.response) return error.message;
    }
  }
);

const circulationEntity = createEntityAdapter({
  selectId: (circulation) => circulation._id,
});

const circulationSlice = createSlice({
  name: "circulations",
  initialState: circulationEntity.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getCirculations.fulfilled, (state, action) => {
      circulationEntity.setAll(state, action.payload);
    });
    builder.addCase(saveCirculation.fulfilled, (state, action) => {
      circulationEntity.addOne(state, action.payload);
    });
    builder.addCase(updateCirculation.fulfilled, (state, action) => {
      circulationEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    });
    builder.addCase(deleteCirculation.fulfilled, (state, action) => {
      circulationEntity.removeOne(state, action.payload);
    });
  },
});

export const circulationSelectors = circulationEntity.getSelectors(
  (state) => state.circulation
);
export default circulationSlice.reducer;
