import { UsersAction, HeadersType } from '../utils/const';
import { get, post } from '../utils/requests';

export function signUp(user) {
  return {
    type: UsersAction.SIGN_UP,
    promise: post('/users', [HeadersType.CONTENTTYPE], user),
  };
}

export function signIn(credential) {
  return {
    type: UsersAction.SIGN_IN,
    promise: post('/auth', [HeadersType.CONTENTTYPE], credential),
  };
}

export function getUserData() {
  return {
    type: UsersAction.GET_USER_DATA,
    promise: get('/users', [HeadersType.AUTHORIZATION]),
  };
}

export function signOut() {
  return {
    type: UsersAction.SIGN_OUT,
    access_token: null,
  };
}
