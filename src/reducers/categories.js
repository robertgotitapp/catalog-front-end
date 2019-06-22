import { CategoriesAction } from '../utils/const';

const initialState = { categories: {}, currentCategory: null };

export default function categories(state = initialState, action) {
  switch (action.type) {
    case CategoriesAction.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case CategoriesAction.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
      };
    case CategoriesAction.SELECT_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload.currentCategory,
      };
    default:
      return state;
  }
}
