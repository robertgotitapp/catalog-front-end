import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import logger from './logger';
import processRequest from './processRequest';

export default applyMiddleware(
  thunk,
  processRequest,
  logger,

);
