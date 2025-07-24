import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    loading: false,
    projects: [],
    error: null,
    message: null,
    singleProject: {},
  },
  reducers: {
    getAllProjectsRequest(state) {
      state.projects = [];
      state.error = null;
      state.loading = true;
    },
    getAllProjectsSuccess(state, action) {
      state.projects = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllProjectsFailed(state, action) {
      state.projects = state.projects;
      state.error = action.payload;
      state.loading = false;
    },
    deleteProjectRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteProjectSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteProjectFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    updateProjectRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    updateProjectSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    updateProjectFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    addProjectRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    addProjectSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    addProjectFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    resetProjectSlice(state) {
      state.error = null;
      state.projects = state.projects;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      state.projects = state.projects;
    },
  },
});

export const getAllProjects = () => {
  return async (dispatch) => {
    dispatch(projectSlice.actions.getAllProjectsRequest());
    try {
      const { data } = await axios.get(
        " http://localhost:4000/api/v1/project/getall",
        {
          withCredentials: true,
        }
      );
      dispatch(projectSlice.actions.getAllProjectsSuccess(data.project));
      dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        projectSlice.actions.getAllProjectsFailed(error.response.data.message)
      );
    }
  };
};
export const deleteProject = (id) => {
  return async (dispatch) => {
    dispatch(projectSlice.actions.deleteProjectRequest());
    try {
      const { data } = await axios.delete(
        ` http://localhost:4000/api/v1/project/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
      dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        projectSlice.actions.deleteProjectFailed(error.response.data.message)
      );
    }
  };
};
export const updateProject = (id, newData) => {
  return async (dispatch) => {
    dispatch(projectSlice.actions.updateProjectRequest());
    try {
      const { data } = await axios.put(
        ` http://localhost:4000/api/v1/project/update/${id}`,
        newData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(projectSlice.actions.updateProjectSuccess(data.message));
      dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        projectSlice.actions.updateProjectFailed(error.response.data.message)
      );
    }
  };
};
export const addProject = (projectData) => {
  return async (dispatch) => {
    dispatch(projectSlice.actions.addProjectRequest());
    try {
      const { data } = await axios.post(
        ` http://localhost:4000/api/v1/project/add/`,
        projectData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(projectSlice.actions.addProjectSuccess(data.message));
      dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        projectSlice.actions.addProjectFailed(error.response.data.message)
      );
    }
  };
};
export const resestProjects = () => {
  return (dispatch) => {
    dispatch(projectSlice.actions.resetProjectSlice());
  };
};

export const clearAllProjectsErrors = () => {
  return (dispatch) => {
    dispatch(projectSlice.actions.clearAllErrors());
  };
};
export default projectSlice.reducer;
