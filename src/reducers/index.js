import { combineReducers } from 'redux';
import users from './users';
import categories from './categories';
import items from './items';

export default combineReducers({
  users,
  categories,
  items,
});
