import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  signUp, signIn, signOut, getUserData,
} from '../users';
import { UsersAction, HeadersType } from '../../utils/const';
import { post, get } from '../../utils/requests';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('actions/users', () => {
  const store = mockStore({});

  beforeEach(() => {
    store.clearActions();
  });

  it('should create SIGN_UP when signUp is called', async () => {
    const user = {
      username: 'user01',
      password: 'Password1',
      name: 'User Name 01',
      email: 'user01@gmail.com',
    };
    store.dispatch(signUp(user));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: UsersAction.SIGN_UP,
      promise: post('/users', [HeadersType.CONTENTTYPE], user),
    });
  });

  it('should create SIGN_IN when signIn is called', async () => {
    const credential = {
      username: 'user01',
      password: 'Password1',
    };
    store.dispatch(signIn(credential));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: UsersAction.SIGN_IN,
      promise: post('/auth', [HeadersType.CONTENTTYPE], credential),
    });
  });

  it('should create GET_USER_DATA when getUserData is called', async () => {
    store.dispatch(getUserData());
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: UsersAction.GET_USER_DATA,
      promise: get('/users', [HeadersType.AUTHORIZATION]),
    });
  });

  it('should create SIGN_OUT when signOut is called', () => {
    store.dispatch(signOut());
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: UsersAction.SIGN_OUT,
    });
  });
});
