import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getMembers = createAsyncThunk("members/getMembers", async () => {
  try {
    const response = await axios.get("http://localhost:8080/members");
    return response.data;
  } catch (error) {
    if (error.response) return error.message;
  }
});

// export const saveMember = createAsyncThunk(
//   "members/saveMember",
//   async ({ _id, name, gender, address, email, phone }) => {
//     try {
//       const response = await axios.post("http://localhost:8080/member", {
//         _id,
//         name,
//         gender,
//         address,
//         email,
//         phone,
//       });
//       return response.data;
//     } catch (error) {
//       if (error.response) return error.message;
//     }
//   }
// );

export const updateMember = createAsyncThunk(
  "members/updateMember",
  async ({ id, name, gender, address, email, phone }) => {
    try {
      const response = await axios.patch(`http://localhost:8080/member/${id}`, {
        name,
        gender,
        address,
        email,
        phone,
      });
      return response.data;
    } catch (error) {
      if (error.response) return error.message;
    }
  }
);

export const deleteMember = createAsyncThunk(
  "members/deleteMember",
  async (id) => {
    try {
      await axios.delete(`http://localhost:8080/member/${id}`);
      return id;
    } catch (error) {
      if (error.response) return error.message;
    }
  }
);

const memberEntity = createEntityAdapter({
  selectId: (member) => member._id,
});

const memberSlice = createSlice({
  name: "members",
  initialState: memberEntity.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getMembers.fulfilled, (state, action) => {
      memberEntity.setAll(state, action.payload);
    });
    // builder.addCase(saveMember.fulfilled, (state, action) => {
    //   memberEntity.addOne(state, action.payload);
    // });
    builder.addCase(updateMember.fulfilled, (state, action) => {
      memberEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    });
    builder.addCase(deleteMember.fulfilled, (state, action) => {
      memberEntity.removeOne(state, action.payload);
    });
  },
});

export const memberSelectors = memberEntity.getSelectors(
  (state) => state.member
);
export default memberSlice.reducer;
