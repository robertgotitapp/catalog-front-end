import logger from './logger'
import processRequest from './processRequest'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

export default applyMiddleware (
  thunk, 
  processRequest,
  logger,

)