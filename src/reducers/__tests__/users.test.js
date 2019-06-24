import { UsersAction } from '../../utils/const';

const reducer = require('../users').default;

describe('reducers/users', () => {
  it('load current user data', () => {
    const action = {
      type: UsersAction.LOAD_CURRENT_USER_DATA,
      userId: 1,
    };
    const result = reducer(undefined, action);
    expect(result.userId).toEqual(1);
  });

  it('sign out', () => {
    const action = {
      type: UsersAction.SIGN_OUT,
    };
    const result = reducer(undefined, action);
    expect(result.userId).toEqual(null);
  });
});
