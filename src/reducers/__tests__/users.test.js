import { UsersAction } from '../../utils/const';

const reducer = require('../users').default;

describe('reducers/users', () => {
  it('sign out', () => {
    const action = {
      type: UsersAction.SIGN_OUT,
      access_token: null,
    };
    const result = reducer(undefined, action);
    expect(result.access_token).toEqual(null);
  });
});
