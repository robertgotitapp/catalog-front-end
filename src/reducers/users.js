import { UsersAction } from '../utils/const';

const initialState = {
  access_token: null,
  signedUser: null,
  items: null,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    // case UsersAction.SIGN_IN_SUCCESS:
    //   return action.payload;
    case UsersAction.SIGN_OUT:
      return {
        items: null,
        signedUser: null,
        access_token: action.access_token,
      };
    default:
      return state;
  }
}
