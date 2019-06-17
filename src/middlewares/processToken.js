import { UsersAction } from '../utils/const';

const processToken = store => next => (action) => {
  if (action.type === UsersAction.SIGN_IN_SUCCESS) {
    localStorage.setItem('accessToken', action.payload.access_token);
  }
  if (action.type === UsersAction.SIGN_OUT) {
    localStorage.removeItem('accessToken');
  }
  return next(action);
};

export default processToken;
