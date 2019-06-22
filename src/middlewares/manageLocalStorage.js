import { UsersAction } from '../utils/const';

const manageLocalStorage = store => next => (action) => {
  if (action.type === UsersAction.SIGN_IN_SUCCESS) {
    localStorage.setItem('accessToken', action.payload.access_token);
  }
  if (action.type === UsersAction.GET_USER_DATA_SUCCESS) {
    localStorage.setItem('userId', action.payload.user.id);
    localStorage.setItem('username', action.payload.user.username);
    localStorage.setItem('name', action.payload.user.name);
  }
  if (action.type === UsersAction.SIGN_OUT) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
  }
  return next(action);
};

export default manageLocalStorage;
