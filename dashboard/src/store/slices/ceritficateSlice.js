import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const certificateSlice = createSlice({
  name: "certificates",
  initialState: {
    loading: false,
    certificates: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllCertificateRequest(state) {
      state.certificates = [];
      state.error = null;
      state.loading = true;
    },
    getAllCertificateSuccess(state, action) {
      state.certificates = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllCertificateFailed(state, action) {
      state.certificates = state.certificates;
      state.error = action.payload;
      state.loading = false;
    },
    deleteCertificateRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteCertificateSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteCertificateFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    addCertificateRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    addCertificateSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    addCertificateFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    resetCertificateSlice(state) {
      state.error = null;
      state.certificates = state.certificates;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      state.certificates = state.certificates;
    },
  },
});

export const getAllCertificate = () => {
  return async (dispatch) => {
    dispatch(certificateSlice.actions.getAllCertificateRequest());
    try {
      const { data } = await axios.get(
        "  https://mern-portfolio-fawn.vercel.app/api/v1/certificate/getall",
        {
          withCredentials: true,
        }
      );
      dispatch(
        certificateSlice.actions.getAllCertificateSuccess(
          data.certificates
        )
      );
      dispatch(certificateSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        certificateSlice.actions.getAllCertificateFailed(
          error.response.data.message
        )
      );
    }
  };
};
export const deleteCertificate = (id) => {
  return async (dispatch) => {
    dispatch(certificateSlice.actions.deleteCertificateRequest());
    try {
      const { data } = await axios.delete(
        `  https://mern-portfolio-fawn.vercel.app/api/v1/certificate/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(certificateSlice.actions.deleteCertificateSuccess(data.message));
      dispatch(certificateSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        certificateSlice.actions.deleteCertificateFailed(
          error.response.data.message
        )
      );
    }
  };
};
export const addCertificate = (certificateData) => {
  return async (dispatch) => {
    dispatch(certificateSlice.actions.addCertificateRequest());
    try {
      const { data } = await axios.post(
        `  https://mern-portfolio-fawn.vercel.app/api/v1/certificate/add`,
        certificateData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(certificateSlice.actions.addCertificateSuccess(data.message));
      dispatch(certificateSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        certificateSlice.actions.addCertificateFailed(
          error.response.data.message
        )
      );
    }
  };
};
export const resestCertificate = () => {
  return (dispatch) => {
    dispatch(certificateSlice.actions.resetCertificateSlice());
  };
};

export const clearAllCertificateErrors = () => {
  return (dispatch) => {
    dispatch(certificateSlice.actions.clearAllErrors());
  };
};
export default certificateSlice.reducer;
