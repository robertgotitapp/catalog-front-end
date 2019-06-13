import { CategoriesAction } from '../utils/const';

export default function categoriesReducer(state = { categories: {} }, action) {
  switch (action.type) {
    case CategoriesAction.ADD_CATEGORY_SUCCESS:
      // fixing problem with id not consitent
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case CategoriesAction.GET_CATEGORIES_SUCCESS:
      return { categories: action.payload.categories };
    default:
      return state;
  }
}
