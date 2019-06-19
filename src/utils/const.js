// Type of Users Actions
export const UsersAction = {
  SIGN_UP: 'SIGN_UP',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILED: 'SIGN_UP_FAILED',
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILED: 'SIGN_IN_FAILED',
  SIGN_OUT: 'SIGN_OUT',
  GET_USER_DATA: 'GET_USER_DATA',
  GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS',
  GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED',
};

// Type of Categories Actions
export const CategoriesAction = {
  ADD_CATEGORY: 'ADD_CATEGORY',
  ADD_CATEGORY_SUCCESS: 'ADD_CATEGORY_SUCCESS',
  ADD_CATEGORY_FAILED: 'ADD_CATEGORY_FAILED',
  GET_CATEGORIES: 'GET_CATEGORIES',
  GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILED: 'GET_CATEGORIES_FAILED',
  SELECT_CURRENT_CATEGORY: 'SELECT_CURRENT_CATEGORY',
};

// Type of Items Actions
export const ItemsAction = {
  ADD_ITEM: 'ADD_ITEM',
  ADD_ITEM_SUCCESS: 'ADD_ITEM_SUCCESS',
  ADD_ITEM_FAILED: 'ADD_ITEM_FAILED',
  GET_ITEMS: 'GET_ITEMS',
  GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS',
  GET_ITEMS_FAILED: 'GET_ITEMS_FAILED',
  UPDATE_ITEM: 'UPDATE_ITEM',
  UPDATE_ITEM_SUCCESS: 'UPDATE_ITEM_SUCCESS',
  UPDATE_ITEM_FAILED: 'UPDATE_ITEM_FAILED',
  DELETE_ITEM: 'DELETE_ITEM',
  DELETE_ITEM_SUCCESS: 'DELETE_ITEM_SUCCESS',
  DELETE_ITEM_FAILED: 'DELETE_ITEM_FAILED',
  SELECT_ITEM_PAGE: 'SELECT_ITEM_PAGE',
};

// Header Types Declaration
export const HeadersType = {
  CONTENTTYPE: 'CONTENT-TYPE',
  AUTHORIZATION: 'AUTHORIZATION',
};

// Status Code Declaration to return by middleware
export const RequestStatusCode = {
  SUCCESS: 1,
  FAILED: 0,
};

// Different types of HTTP Requests
export const RequestType = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const PaginationConfig = {
  ITEMS_PER_PAGE: 9,
  CATEGORIES_PER_PAGE: 20,
  DEFAULT_OFFSET: 0,
  DEFAULT_PAGE: 1,
};

export const REGEX = {
  EMAIL: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
  PASSWORD: '^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$',
};
