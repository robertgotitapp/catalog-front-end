import { CategoriesAction } from '../utils/const';

export default function categoriesReducer(state = {}, action) {
  switch (action.type) {
    case CategoriesAction.ADD_CATEGORY_SUCCESS:
      return action.payload.categories;
    default:
      return state;
  }
}
