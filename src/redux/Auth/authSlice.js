import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  refresh,
  completeProfile,
  updateUser,
} from "./authOperations";

const extraActions = [register, login, logout, refresh];
const getActions = (type) =>
  isAnyOf(...extraActions.map((action) => action[type]));

const authFulfilledReducer = (state, action) => {
  state.user = action.payload.data.user;
  state.token = action.payload.data.token;
};
const logoutFulfilledReducer = (state) => {
  state.user = {
    name: null,
    email: null,
    avatar: null,
    userId: null,
  };
  state.token = null;
  state.error = null;
  state.isLoading = false;
};
const refreshFulfilledReducer = (state, action) => {
  state.user = action.payload;
  state.isLoading = false;
};
const updateUserFullfilledReducer = (state, action) => {
  state.user.name = action.payload.data.user.name;
  state.user.avatar = action.payload.data.user.avatar;
};
const completeProfileFullfilledReducer = (state, action) => {
  state.isLoading = false;
  state.error = null;
};
const anyPendingReducer = (state) => {
  state.isLoading = true;
};
const anyRejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload?.message || action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
      avatar: null,
      userId: null,
    },
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload?.message;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(refresh.fulfilled, refreshFulfilledReducer)
      .addCase(logout.fulfilled, logoutFulfilledReducer)
      .addCase(updateUser.fulfilled, updateUserFullfilledReducer)
      .addCase(completeProfile.fulfilled, completeProfileFullfilledReducer)
      .addMatcher(
        isAnyOf(register.fulfilled, login.fulfilled),
        authFulfilledReducer
      )
      .addMatcher(getActions("pending"), anyPendingReducer)
      .addMatcher(getActions("rejected"), anyRejectedReducer)
      .addMatcher(isAnyOf(refresh.rejected, logout.fulfilled), (state) => {
        state.isLoading = false;
        state.error = "Unauthorized";
        state.user = {
          name: null,
          email: null,
          avatar: null,
          userId: null,
        };
        state.token = null;
        state.error = null;
        state.isLoading = false;
      }),
});

export const authReducer = authSlice.reducer;
export const { setError } = authSlice.actions;
export const apiMiddleware = (store) => (next) => async (action) => {
  if (action.error && action.payload?.response?.status === 401) {
    await store.dispatch(refresh());
    const retryAction = { ...action, _retry: true };
    return store.dispatch(retryAction);
  }
  return next(action);
};

// export const apiMiddleware = (store) => (next) => async (action) => {
//   if (action.error && action.payload?.response?.status === 401) {
//     await store.dispatch(refresh())
//   }
//   return next(action)
// }
