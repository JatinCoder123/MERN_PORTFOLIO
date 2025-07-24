import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequest(state) {
      state.timeline = [];
      state.error = null;
      state.loading = true;
    },
    getAllTimelineSuccess(state, action) {
      state.timeline = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllTimelineFailed(state, action) {
      state.timeline = state.timeline;
      state.error = action.payload;
      state.loading = false;
    },
    deleteTimelineRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteTimelineSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteTimelineFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    addTimelineRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    addTimelineSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    addTimelineFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    resetTimelineSlice(state) {
      state.error = null;
      state.timeline = state.timeline;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      state.timeline = state.timeline;
    },
  },
});

export const getAllTimeline = () => {
  return async (dispatch) => {
    dispatch(timelineSlice.actions.getAllTimelineRequest());
    try {
      const { data } = await axios.get(
        "  https://mern-portfolio-fawn.vercel.app/api/v1/timeline/getall",
        {
          withCredentials: true,
        }
      );
      dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timelines));
      dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        timelineSlice.actions.getAllTimelineFailed(error.response.data.message)
      );
    }
  };
};
export const deleteTimeline = (id) => {
  return async (dispatch) => {
    dispatch(timelineSlice.actions.deleteTimelineRequest());
    try {
      const { data } = await axios.delete(
        `  https://mern-portfolio-fawn.vercel.app/api/v1/timeline/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message));
      dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        timelineSlice.actions.deleteTimelineFailed(error.response.data.message)
      );
    }
  };
};
export const addTimeline = (timelineData) => {
  return async (dispatch) => {
    dispatch(timelineSlice.actions.addTimelineRequest());
    try {
      const { data } = await axios.post(
        `  https://mern-portfolio-fawn.vercel.app/api/v1/timeline/add/`,
        timelineData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(timelineSlice.actions.addTimelineSuccess(data.message));
      dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        timelineSlice.actions.addTimelineFailed(error.response.data.message)
      );
    }
  };
};
export const resestTimeline = () => {
  return (dispatch) => {
    dispatch(timelineSlice.actions.resetTimelineSlice());
  };
};

export const clearAllTimelineErrors = () => {
  return (dispatch) => {
    dispatch(timelineSlice.actions.clearAllErrors());
  };
};
export default timelineSlice.reducer;
