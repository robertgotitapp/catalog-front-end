import { SIGN_IN, SIGN_UP, SIGN_OUT } from '../utils/const';
import post from '../utils/requests';

export function signUp(user) {
  return {
    type: SIGN_UP,
    promise: post('http://127.0.0.1:5000/users', user),
  };
}

export function signIn(credential) {
  return {
    type: SIGN_IN,
    promise: post('http://127.0.0.1:5000/auth', credential),
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}
