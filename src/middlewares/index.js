import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import logger from './logger';
import processRequest from './processRequest';
import processToken from './processToken';
import formatIncomingData from './formatIncomingData';

export default applyMiddleware(
  thunk,
  processRequest,
  processToken,
  formatIncomingData,
  logger,
);
