import { ItemsAction, HeadersType } from '../utils/const';
import {
  get, post, update, remove,
} from '../utils/requests';

export const addItem = (categoryId, item) => async (dispatch) => {
  const response = await dispatch({
    type: ItemsAction.ADD_ITEM,
    promise: post(`/categories/${categoryId}/items`,
      [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
      item),
  });
  return response;
};

export const getItems = (categoryId, offset, limit) => async (dispatch) => {
  const response = await dispatch({
    type: ItemsAction.GET_ITEMS,
    promise: get(`/categories/${categoryId}/items?offset=${offset}&limit=${limit}`),
  });
  return response;
};

export const removeItem = (categoryId, itemId) => async (dispatch) => {
  const response = await dispatch({
    type: ItemsAction.DELETE_ITEM,
    promise: remove(`/categories/${categoryId}/items/${itemId}`,
      [HeadersType.AUTHORIZATION]),
  });
  return response;
};

export const updateItem = (categoryId, itemId, item) => async (dispatch) => {
  const response = await dispatch({
    type: ItemsAction.UPDATE_ITEM,
    promise: update(
      `/categories/${categoryId}/items/${itemId}`,
      [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
      item,
    ),
  });
  return response;
};
