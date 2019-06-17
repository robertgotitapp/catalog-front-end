import { CategoriesAction, HeadersType } from '../utils/const';
import { post, get } from '../utils/requests';

export function addCategory(category) {
  return {
    type: CategoriesAction.ADD_CATEGORY,
    promise: post('/categories',
      [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
      category),
  };
}

export function getCategories(offset, limit) {
  return {
    type: CategoriesAction.GET_CATEGORIES,
    promise: get(`/categories?offset=${offset}&limit=${limit}`),
  };
}

export function selectCurrentCategory(selectedCategory) {
  return {
    type: CategoriesAction.SELECT_CURRENT_CATEGORY,
    payload: { currentCategory: selectedCategory },
  };
}
