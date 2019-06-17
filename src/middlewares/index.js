import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import logger from './logger';
import processRequest from './processRequest';
import processToken from './processToken';

export default applyMiddleware(
  thunk,
  processRequest,
  processToken,
  logger,
);
