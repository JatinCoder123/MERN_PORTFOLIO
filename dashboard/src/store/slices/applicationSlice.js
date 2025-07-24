import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    loading: false,
    applications: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllApplicationRequest(state) {
      state.applications = [];
      state.error = null;
      state.loading = true;
    },
    getAllApplicationSuccess(state, action) {
      state.applications = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllApplicationFailed(state, action) {
      state.applications = state.applications;
      state.error = action.payload;
      state.loading = false;
    },
    deleteApplicationRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteApplicationSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteApplicationFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    addApplicationRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    addApplicationSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    addApplicationFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    resetApplicationSlice(state) {
      state.error = null;
      state.applications = state.applications;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      state.applications = state.applications;
    },
  },
});

export const getAllApplication = () => {
  return async (dispatch) => {
    dispatch(applicationSlice.actions.getAllApplicationRequest());
    try {
      const { data } = await axios.get(
        "  https://mern-portfolio-fawn.vercel.app/api/v1/softwareApplication/getall",
        {
          withCredentials: true,
        }
      );
      dispatch(applicationSlice.actions.getAllApplicationSuccess(data.softwareApplications));
      dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        applicationSlice.actions.getAllApplicationFailed(error.response.data.message)
      );
    }
  };
};
export const deleteApplication = (id) => {
  return async (dispatch) => {
    dispatch(applicationSlice.actions.deleteApplicationRequest());
    try {
      const { data } = await axios.delete(
        `  https://mern-portfolio-fawn.vercel.app/api/v1/softwareApplication/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(applicationSlice.actions.deleteApplicationSuccess(data.message));
      dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        applicationSlice.actions.deleteApplicationFailed(error.response.data.message)
      );
    }
  };
};
export const addApplication = (applicationData) => {
  return async (dispatch) => {
    dispatch(applicationSlice.actions.addApplicationRequest());
    try {
      const { data } = await axios.post(
        `  https://mern-portfolio-fawn.vercel.app/api/v1/softwareApplication/add/`,
        applicationData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(applicationSlice.actions.addApplicationSuccess(data.message));
      dispatch(applicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        applicationSlice.actions.addApplicationFailed(error.response.data.message)
      );
    }
  };
};
export const resestApplication = () => {
  return (dispatch) => {
    dispatch(applicationSlice.actions.resetApplicationSlice());
  };
};

export const clearAllApplicationErrors = () => {
  return (dispatch) => {
    dispatch(applicationSlice.actions.clearAllErrors());
  };
};
export default applicationSlice.reducer;
