import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getBooks = createAsyncThunk("books/getBooks", async () => {
  try {
    const response = await axios.get("http://localhost:8080/books");
    return response.data;
  } catch (error) {
    if (error.response) return error.message;
  }
});

export const saveBook = createAsyncThunk(
  "books/saveBook",
  async ({ name, category, author, publisher, year }) => {
    try {
      const response = await axios.post("http://localhost:8080/add-book", {
        name,
        category,
        author,
        publisher,
        year,
      });
      return response.data;
    } catch (error) {
      if (error.response) return error.message;
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, name, category, author, publisher, year }) => {
    try {
      const response = await axios.patch(`http://localhost:8080/book/${id}`, {
        name,
        category,
        author,
        publisher,
        year,
      });
      return response.data;
    } catch (error) {
      if (error.response) return error.message;
    }
  }
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  try {
    await axios.delete(`http://localhost:8080/delete-book/${id}`);
    return id;
  } catch (error) {
    if (error.response) return error.message;
  }
});

const bookEntity = createEntityAdapter({
  selectId: (book) => book._id,
});

const bookSlice = createSlice({
  name: "books",
  initialState: bookEntity.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getBooks.fulfilled, (state, action) => {
      bookEntity.setAll(state, action.payload);
    });
    builder.addCase(saveBook.fulfilled, (state, action) => {
      bookEntity.addOne(state, action.payload);
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      bookEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      bookEntity.removeOne(state, action.payload);
    });
  },
});

export const bookSelectors = bookEntity.getSelectors((state) => state.book);
export default bookSlice.reducer;
