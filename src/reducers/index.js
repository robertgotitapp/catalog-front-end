import { combineReducers } from 'redux';
import usersReducer from './users';
import categoriesReducer from './categories';
import itemsReducer from './items';

export default combineReducers({
  usersReducer,
  categoriesReducer,
  itemsReducer,
});
