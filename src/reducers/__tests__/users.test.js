import { UsersAction } from '../../utils/const';

const reducer = require('../users').default;

describe('reducers/users', () => {
  it('sign in success', () => {
    const action = {
      type: UsersAction.SIGN_IN_SUCCESS,
      payload: {
        access_token: 'ABCDEFGHIJK1234567890',
      },
    };
    const result = reducer(undefined, action);
    expect(result.access_token).toEqual('ABCDEFGHIJK1234567890');
  });

  it('sign out', () => {
    const action = {
      type: UsersAction.SIGN_OUT,
      access_token: null,
    };
    const result = reducer(undefined, action);
    expect(result.access_token).toEqual(null);
  });
});
