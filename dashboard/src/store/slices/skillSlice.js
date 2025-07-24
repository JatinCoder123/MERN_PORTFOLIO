import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    loading: false,
    skills: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillsRequest(state) {
      state.skills = [];
      state.error = null;
      state.loading = true;
    },
    getAllSkillsSuccess(state, action) {
      state.skills = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllSkillsFailed(state, action) {
      state.skills = state.skills;
      state.error = action.payload;
      state.loading = false;
    },
    deleteSkillsRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteSkillsSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteSkillsFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    updateSkillsRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    updateSkillsSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    updateSkillsFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    addSkillsRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    addSkillsSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    addSkillsFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    resetSkillsSlice(state) {
      state.error = null;
      state.skills = state.skills;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      state.skills = state.skills;
    },
  },
});

export const getAllSkills = () => {
  return async (dispatch) => {
    dispatch(skillsSlice.actions.getAllSkillsRequest());
    try {
      const { data } = await axios.get(
        " http://localhost:4000/api/v1/skill/getall",
        {
          withCredentials: true,
        }
      );
      dispatch(skillsSlice.actions.getAllSkillsSuccess(data.skills));
      dispatch(skillsSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        skillsSlice.actions.getAllSkillsFailed(error.response.data.message)
      );
    }
  };
};
export const deleteSkill = (id) => {
  return async (dispatch) => {
    dispatch(skillsSlice.actions.deleteSkillsRequest());
    try {
      const { data } = await axios.delete(
        ` http://localhost:4000/api/v1/skill/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(skillsSlice.actions.deleteSkillsSuccess(data.message));
      dispatch(skillsSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        skillsSlice.actions.deleteSkillsFailed(error.response.data.message)
      );
    }
  };
};
export const updateSkill = (id, proficiency) => {
  return async (dispatch) => {
    dispatch(skillsSlice.actions.updateSkillsRequest());
    try {
      const { data } = await axios.put(
        ` http://localhost:4000/api/v1/skill/update/${id}`,
        {proficiency},
        {
          withCredentials: true,
          headers:{"Content-Type":"application/json"}
        }
      );
      dispatch(skillsSlice.actions.updateSkillsSuccess(data.message));
      dispatch(skillsSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        skillsSlice.actions.updateSkillsFailed(error.response.data.message)
      );
    }
  };
};
export const addSkill = (skillData) => {
  return async (dispatch) => {
    dispatch(skillsSlice.actions.addSkillsRequest());
    try {
      const { data } = await axios.post(
        ` http://localhost:4000/api/v1/skill/add/`,
        skillData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(skillsSlice.actions.addSkillsSuccess(data.message));
      dispatch(skillsSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        skillsSlice.actions.addSkillsFailed(error.response.data.message)
      );
    }
  };
};
export const resestSkills = () => {
  return (dispatch) => {
    dispatch(skillsSlice.actions.resetSkillsSlice());
  };
};

export const clearAllSkillsErrors = () => {
  return (dispatch) => {
    dispatch(skillsSlice.actions.clearAllErrors());
  };
};
export default skillsSlice.reducer;
