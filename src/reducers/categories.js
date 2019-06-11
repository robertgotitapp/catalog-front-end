import { ADD_CATEGORY_SUCCESS } from '../utils/const';

export default function categories(state = {}, action) {
  switch (action.type) {
    case ADD_CATEGORY_SUCCESS:
      return action.payload.categories;
    default:
      return state;
  }
}
