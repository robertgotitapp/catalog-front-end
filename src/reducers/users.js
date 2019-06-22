import { UsersAction } from '../utils/const';

const initialState = {
  userId: null,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case UsersAction.LOAD_CURRENT_USER_DATA:
      return { userId: action.userId };
    case UsersAction.SIGN_OUT:
      return {
        userId: null,
      };
    default:
      return state;
  }
}
