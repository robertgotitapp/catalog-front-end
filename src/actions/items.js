import { ItemsAction, HeadersType } from '../utils/const';
import {
  get, post, update, remove,
} from '../utils/requests';

export function addItem(categoryId, item) {
  return {
    type: ItemsAction.ADD_ITEM,
    promise: post(`/categories/${categoryId}/items`,
      [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
      item),
  };
}

export function getItems(categoryId, offset, limit) {
  return {
    type: ItemsAction.GET_ITEMS,
    promise: get(`/categories/${categoryId}/items?offset=${offset}&limit=${limit}`),
  };
}

export function removeItem(categoryId, itemId) {
  return {
    type: ItemsAction.DELETE_ITEM,
    promise: remove(`/categories/${categoryId}/items/${itemId}`,
      [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION]),
  };
}

export function updateItem(categoryId, itemId, item) {
  return {
    type: ItemsAction.UPDATE_ITEM,
    promise: update(
      `/categories/${categoryId}/items/${itemId}`,
      [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
      item,
    ),
  };
}

export function selectItemPage(pageNumber) {
  return {
    type: ItemsAction.SELECT_ITEM_PAGE,
    payload: { currentPage: pageNumber },
  };
}
