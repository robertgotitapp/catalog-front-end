import { RequestStatusCode } from '../utils/const';

const processRequest = store => next => (action) => {
  if (!action.promise) { return next(action); }

  const SUCCESS_ACTION = `${action.type}_SUCCESS`;
  const FAILED_ACTION = `${action.type}_FAILED`;

  return action.promise
    .then((result) => {
      next({
        type: SUCCESS_ACTION,
        payload: result,
      });
      // Must return result for component to get the result
      return { res: result, statusCode: RequestStatusCode.SUCCESS };
    })
    .catch((err) => {
      next({
        type: FAILED_ACTION,
        error: err,
      });
      // Must return error for component to get the errors
      return { res: err, statusCode: RequestStatusCode.FAILED };
    });
};

export default processRequest;
