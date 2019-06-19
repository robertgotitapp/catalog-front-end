import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import logger from './logger';
import processRequest from './processRequest';
import manageLocalStorage from './manageLocalStorage';
import formatIncomingData from './formatIncomingData';

export default applyMiddleware(
  thunk,
  processRequest,
  manageLocalStorage,
  formatIncomingData,
  logger,
);
