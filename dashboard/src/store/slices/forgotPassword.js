import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const forgotPassSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const forgotPass = (email) => {
  return async (dispatch) => {
    dispatch(forgotPassSlice.actions.forgotPasswordRequest());
    try {
      const { data } = await axios.post(
        " http://localhost:4000/api/v1/user/password/forgot",
        { email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(forgotPassSlice.actions.forgotPasswordSuccess(data.message));
      dispatch(forgotPassSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        forgotPassSlice.actions.forgotPasswordFailed(
          error.response.data.message
        )
      );
    }
  };
};
export const resetPass = (token, newPassword, confirmPassword) => {
  return async (dispatch) => {
    dispatch(forgotPassSlice.actions.resetPasswordRequest());
    try {
      const { data } = await axios.put(
        ` http://localhost:4000/api/v1/user/password/reset/${token}`,
        { newPassword, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(forgotPassSlice.actions.resetPasswordSuccess(data.message));
      dispatch(forgotPassSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        forgotPassSlice.actions.resetPasswordFailed(error.response.data.message)
      );
    }
  };
};

export const clearAllForgotPasswordErrors = () => {
  return (dispatch) => {
    dispatch(forgotPassSlice.actions.clearAllErrors());
  };
};
export const forgotPassAction = forgotPassSlice.actions;
export default forgotPassSlice.reducer;
