import { combineReducers } from 'redux';
import users from './users';
import categories from './categories';

export default combineReducers({
  users,
  categories,
});
