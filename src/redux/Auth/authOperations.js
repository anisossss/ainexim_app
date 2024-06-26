import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUser,
  loginUser,
  logoutUser,
  refreshUser,
  setAuthHeader,
  clearAuthHeader,
  updateUserInfo,
  completeProfileInfo,
} from "services/auth-API";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await createUser(credentials);
      setAuthHeader(res.data.token);
      return res;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const fingerprint = result.visitorId;
      const res = await loginUser({ ...credentials, fingerprint });
      setAuthHeader(res.data.token);
      return res;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await logoutUser();
    clearAuthHeader();
    return res;
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : "Something went wrong";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  const { token } = thunkAPI.getState().auth;
  if (!token) {
    return thunkAPI.rejectWithValue();
  }
  try {
    setAuthHeader(token);
    const { data } = await refreshUser();
    return data;
  } catch (error) {
    const errorMessage = error.message || "Something went wrong";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const updateUser = createAsyncThunk(
  "/auth/update",
  async (credentials, thunkAPI) => {
    try {
      const data = await updateUserInfo(credentials);
      return data;
    } catch (error) {
      const errorMessage = error.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const completeProfile = createAsyncThunk(
  "/auth/complete",
  async (credentials, thunkAPI) => {
    try {
      const data = await completeProfileInfo(credentials);
      return data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
