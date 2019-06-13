import { UsersAction } from '../utils/const';
import { post } from '../utils/requests';

export function signUp(user) {
  return {
    type: UsersAction.SIGN_UP,
    promise: post('http://127.0.0.1:5000/users', null, user),
  };
}

export function signIn(credential) {
  return {
    type: UsersAction.SIGN_IN,
    promise: post('http://127.0.0.1:5000/auth', null, credential),
  };
}

export function signOut() {
  return {
    type: UsersAction.SIGN_OUT,
    access_token: null,
  };
}
