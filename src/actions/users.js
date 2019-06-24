import { UsersAction, HeadersType } from '../utils/const';
import { get, post } from '../utils/requests';

export const signUp = user => async (dispatch) => {
  const response = await dispatch({
    type: UsersAction.SIGN_UP,
    promise: post('/users', [HeadersType.CONTENTTYPE], user),
  });
  return response;
};

export const signIn = credential => async (dispatch) => {
  const response = await dispatch({
    type: UsersAction.SIGN_IN,
    promise: post('/auth', [HeadersType.CONTENTTYPE], credential),
  });
  return response;
};

export const getUserData = () => async (dispatch) => {
  const response = await dispatch({
    type: UsersAction.GET_USER_DATA,
    promise: get('/users', [HeadersType.AUTHORIZATION]),
  });
  return response;
};

export const loadCurrentUserData = () => (dispatch) => {
  const userId = localStorage.getItem('userId');
  dispatch({
    type: UsersAction.LOAD_CURRENT_USER_DATA,
    userId,
  });
};

export const signOut = () => (dispatch) => {
  dispatch({
    type: UsersAction.SIGN_OUT,
    access_token: null,
  });
};
