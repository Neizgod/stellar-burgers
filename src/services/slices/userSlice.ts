import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserError: null | string;
  loginUserRequest: boolean;
} & TUser;

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserRequest: false,
  loginUserError: null,
  email: '',
  name: ''
};

export const authUser = createAsyncThunk('user/authUser', async () =>
  getUserApi()
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => loginUserApi(data)
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => registerUserApi(data)
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () =>
  logoutApi()
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => updateUserApi(data)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    userSliceSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(authUser.rejected, (state) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginUserRequest = false;
        state.loginUserError = 'Возникла ошибка при входе пользователя';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })

      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loginUserRequest = false;
        state.loginUserError = 'Возникла ошибка при регистрации пользователя';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // state.email = action.payload.user.email;
        // state.name = action.payload.user.name;
        state.loginUserRequest = false;
        // state.isAuthenticated = true;
        // setCookie('accessToken', action.payload.accessToken);
        // localStorage.setItem('refreshToken', action.payload.refreshToken);
      })

      .addCase(updateUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loginUserRequest = false;
        state.loginUserError =
          'Возникла ошибка при изменении данных пользователя';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.loginUserRequest = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loginUserRequest = false;
        state.loginUserError = 'Возникла ошибка при выходе пользователя';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loginUserRequest = false;
        state.isAuthenticated = false;
        state.email = '';
        state.name = '';
        localStorage.setItem('refreshToken', '');
        deleteCookie('accessToken');
      });
  }
});

export const { userSliceSelector } = userSlice.selectors;
