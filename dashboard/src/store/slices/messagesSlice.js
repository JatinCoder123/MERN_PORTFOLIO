import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllMessagesRequest(state) {
      state.messages = [];
      state.error = null;
      state.loading = true;
    },
    getAllMessagesSuccess(state, action) {
      state.messages = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllMessagesFailed(state, action) {
      state.messages = state.messages;
      state.error = action.payload;
      state.loading = false;
    },
    deleteMessagesRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteMessagesSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteMessagesFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    resetMessageSlice(state) {
      state.error = null;
      state.messages = state.messages;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      state.messages = state.messages;
    },
  },
});

export const getAllMessages = () => {
  return async (dispatch) => {
    dispatch(messageSlice.actions.getAllMessagesRequest());
    try {
      const { data } = await axios.get(
        "  https://mern-portfolio-fawn.vercel.app/api/v1/message/getall",
        {
          withCredentials: true,
        }
      );
      dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages));
      dispatch(messageSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        messageSlice.actions.getAllMessagesFailed(error.response.data.message)
      );
    }
  };
};
export const deleteMessage = (id) => {
  return async (dispatch) => {
    dispatch(messageSlice.actions.deleteMessagesRequest());
    try {
      const { data } = await axios.delete(
        `  https://mern-portfolio-fawn.vercel.app/api/v1/message/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(messageSlice.actions.deleteMessagesSuccess(data.message));
      dispatch(messageSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        messageSlice.actions.deleteMessagesFailed(error.response.data.message)
      );
    }
  };
};
export const resestMessages = () => {
  return (dispatch) => {
    dispatch(messageSlice.actions.resetMessageSlice());
  };
};

export const clearAllMessagesErrors = () => {
  return (dispatch) => {
    dispatch(messageSlice.actions.clearAllErrors());
  };
};
export default messageSlice.reducer;
