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
      return { res: result, statusCode: RequestStatusCode.SUCCESS };
    })
    .catch((err) => {
      next({
        type: FAILED_ACTION,
        error: err,
      });
      return { errors: err, statusCode: RequestStatusCode.FAILED };
    });
};

export default processRequest;
