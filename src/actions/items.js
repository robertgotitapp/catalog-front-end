import { ItemsAction, HeadersType } from '../utils/const';
import {
  get, post, update, remove,
} from '../utils/requests';

export function addItem(categoryId, item) {
  return {
    type: ItemsAction.ADD_ITEM,
    promise: post(`http://127.0.0.1:5000/categories/${categoryId}/items`,
      [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
      item),
  };
}

export function getItems(categoryId, offset, limit) {
  return {
    type: ItemsAction.GET_ITEMS,
    promise: get(`http://127.0.0.1:5000/categories/${categoryId}/items?offset=${offset}&limit=${limit}`),
  };
}

export function removeItem(categoryId, itemId) {
  return {
    type: ItemsAction.DELETE_ITEM,
    promise: remove(`http://127.0.0.1:5000/categories/${categoryId}/items/${itemId}`,
      [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION]),
  };
}

export function updateItem(categoryId, itemId, item) {
  console.log(categoryId);
  console.log(item);
  return {
    type: ItemsAction.UPDATE_ITEM,
    promise: update(
      `http://127.0.0.1:5000/categories/${categoryId}/items/${itemId}`,
      [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
      item,
    ),
  };
}
