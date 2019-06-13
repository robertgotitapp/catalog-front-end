import configureStore from 'redux-mock-store';
import { signUp, signIn, signOut } from '../users';
import { UsersAction } from '../../utils/const';
import { post } from '../../utils/requests';

describe('signUp', () => {
  it('should return correct action object', async () => {
    const response = post('http://127.0.0.1:5000/users', null, {
      username: 'user01',
      password: 'Password1',
      name: 'User Name 01',
      email: 'user01@gmail.com',
    });

    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

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
    const response = post('http://127.0.0.1:5000/auth', null, {
      username: 'user01',
      password: 'Password1',
    });

    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

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

    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    store.dispatch(signOut());

    const actions = store.getActions();
    const actionTriggered = actions.find(action => action.type === UsersAction.SIGN_OUT);
    expect(actionTriggered.access_token).toEqual(response);
  });
});
