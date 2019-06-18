import configureStore from 'redux-mock-store';
import { signUp, signIn, signOut } from '../users';
import { UsersAction, HeadersType } from '../../utils/const';
import { post } from '../../utils/requests';

describe('signUp', () => {
  it('should return correct action object', async () => {
    const response = post(
      '/users',
      [HeadersType.CONTENTTYPE], {
        username: 'user01',
        password: 'Password1',
        name: 'User Name 01',
        email: 'user01@gmail.com',
      },
    );

    // Set up mock store
    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    // dispatch the action through the mock store and
    // get the result action to compare with the expected response
    await store.dispatch(signUp({
      username: 'user01',
      password: 'Password1',
      name: 'User Name 01',
      email: 'user01@gmail.com',
    }));
    const actions = store.getActions();
    const actionTriggered = actions.find(action => action.type === UsersAction.SIGN_UP);
    expect(actionTriggered.promise).toEqual(response);
  });
});

describe('signIn', () => {
  it('should return correct action object', async () => {
    const response = post('/auth',
      [HeadersType.CONTENTTYPE],
      {
        username: 'user01',
        password: 'Password1',
      });

    // Set up mock store
    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    // dispatch the action through the mock store and
    // get the result action to compare with the expected response
    await store.dispatch(signIn({
      username: 'user01',
      password: 'Password1',
    }));
    const actions = store.getActions();
    const actionTriggered = actions.find(action => action.type === UsersAction.SIGN_IN);
    expect(actionTriggered.promise).toEqual(response);
  });
});

describe('signOut', () => {
  it('should return correct action object', () => {
    const response = null;

    // Set up mock store
    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    store.dispatch(signOut());
    const actions = store.getActions();
    const actionTriggered = actions.find(action => action.type === UsersAction.SIGN_OUT);
    expect(actionTriggered.access_token).toEqual(response);
  });
});
