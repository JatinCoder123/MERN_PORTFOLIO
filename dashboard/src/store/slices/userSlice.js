import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    loadUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    updateUserPasswordRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateUserPasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateUserPasswordFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    updateUserProfileRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateUserProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateUserProfileFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    updateProfileAfterReset(state) {
      state.isUpdated = false;
      state.error = null;
      state.message = null;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    clearAllErrors(state ) {
      state.error = null;
      state.user = state.user;
    },
  },
});

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try {
      const { data } = await axios.post(
        " http://localhost:4000/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userSlice.actions.loginSuccess(data.user));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
  };
};
export const getUser = () => {
  return async (dispatch) => {
    dispatch(userSlice.actions.loadUserRequest());
    try {
      const { data } = await axios.get(" http://localhost:4000/api/v1/user/me", {
        withCredentials: true,
      });
      dispatch(userSlice.actions.loadUserSuccess(data.user));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
    }
  };
};
export const logout = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        " http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      dispatch(userSlice.actions.logoutSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.logoutFailed(error.response.data.message));
    }
  };
};
export const updatePassword = (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  return async (dispatch) => {
    dispatch(userSlice.actions.updateUserPasswordRequest());
    try {
      const { data } = await axios.put(
        " http://localhost:4000/api/v1/user/update/password",
        { currentPassword, newPassword, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userSlice.actions.updateUserPasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        userSlice.actions.updateUserPasswordFailed(error.response.data.message)
      );
    }
  };
};
export const updateProfile = (newData) => {
  return async (dispatch) => {
    dispatch(userSlice.actions.updateUserProfileRequest());
    try {
      const { data } = await axios.put(
        " http://localhost:4000/api/v1/user/update/me",
        newData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(userSlice.actions.updateUserProfileSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        userSlice.actions.updateUserProfileFailed(error.response.data.message)
      );
    }
  };
};

export const resetProfile = () => {
  return (dispatch) => {
    dispatch(userSlice.actions.updateProfileAfterReset());
  };
};

export const clearAllUserErrors = () => {
  return (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
  };
};
export const userAction = userSlice.actions;
export default userSlice.reducer;
