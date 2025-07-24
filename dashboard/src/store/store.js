import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import forgotPassReducer from "./slices/forgotPassword.js";
import messagesReducer from "./slices/messagesSlice.js";
import timelineReducer from "./slices/timelineSlice.js";
import skillReducer from "./slices/skillSlice.js";
import applicationReducer from "./slices/applicationSlice.js";
import projectReducer from "./slices/projectSlice.js";
import certificateReducer from "./slices/ceritficateSlice.js";
export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPassReducer,
    messages: messagesReducer,
    timeline: timelineReducer,
    skills: skillReducer,
    applications:applicationReducer,
    projects:projectReducer,
    certificates:certificateReducer
  },
});
