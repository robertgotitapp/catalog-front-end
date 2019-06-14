import { CategoriesAction } from '../utils/const';
import { post, get } from '../utils/requests';

export function addCategory(accessToken, category) {
  return {
    type: CategoriesAction.ADD_CATEGORY,
    promise: post('http://127.0.0.1:5000/categories', accessToken, category),
  };
}

export function getCategories(offset, limit) {
  return {
    type: CategoriesAction.GET_CATEGORIES,
    promise: get(`http://127.0.0.1:5000/categories?offset=${offset}&limit=${limit}`),
  };
}

export function selectCurrentCategory(selectedCategory) {
  return {
    type: CategoriesAction.SELECT_CURRENT_CATEGORY,
    payload: { currentCategory: selectedCategory },
  };
}
