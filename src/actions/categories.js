import { CategoriesAction, HeadersType } from '../utils/const';
import { post, get } from '../utils/requests';

export const addCategory = category => async (dispatch) => {
  const response = await dispatch({
    type: CategoriesAction.ADD_CATEGORY,
    promise: post('/categories',
      [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
      category),
  });
  return response;
};

export const getCategories = (offset, limit) => async (dispatch) => {
  const response = await dispatch({
    type: CategoriesAction.GET_CATEGORIES,
    promise: get(`/categories?offset=${offset}&limit=${limit}`),
  });
  return response;
};

export const selectCurrentCategory = selectedCategory => (dispatch) => {
  dispatch({
    type: CategoriesAction.SELECT_CURRENT_CATEGORY,
    payload: { currentCategory: selectedCategory },
  });
};
