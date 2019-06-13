import configureStore from 'redux-mock-store';
import { addCategory, getCategories } from '../categories';
import { CategoriesAction } from '../../utils/const';
import { post, get } from '../../utils/requests';

describe('addCategory', () => {
  it('should return correct action object', async () => {
    const response = post('http://127.0.0.1:5000/categories',
      'ABCDEFGHIJK01234567890',
      {
        name: 'Category 1',
        description: 'Description of Category 1',
      });

    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    await store.dispatch(addCategory({
      name: 'Category 1',
      description: 'Description of Category 1',
    }, 'ABCDEFGHIJK01234567890'));

    const actions = store.getActions();
    const actionTriggered = actions.find(action => action.type === CategoriesAction.ADD_CATEGORY);
    expect(actionTriggered.promise).toEqual(response);
  });
});

describe('getCategories', () => {
  it('should return correct action object', async () => {
    const response = get('http://127.0.0.1:5000/categories?offset=0&limit=100');

    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    await store.dispatch(getCategories(0, 100));

    const actions = store.getActions();
    const actionTriggered = actions.find(action => action.type === CategoriesAction.GET_CATEGORIES);
    expect(actionTriggered.promise).toEqual(response);
  });
});