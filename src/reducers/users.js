import { UsersAction } from '../utils/const';

export default function usersReducer(state = { access_token: null }, action) {
  switch (action.type) {
    case UsersAction.SIGN_IN_SUCCESS:
      console.log(typeof action.payload);
      return action.payload;
    case UsersAction.SIGN_OUT:
      return {
        access_token: action.access_token,
      };
    default:
      return state;
  }
}
