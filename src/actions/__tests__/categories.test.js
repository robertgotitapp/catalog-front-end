import configureStore from 'redux-mock-store';
import { addCategory, getCategories, selectCurrentCategory } from '../categories';
import { CategoriesAction, HeadersType } from '../../utils/const';
import { post, get } from '../../utils/requests';

describe('addCategory', () => {
  it('should return correct action object', async () => {
    const response = post('/categories',
      [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
      {
        name: 'Category 1',
        description: 'Description of Category 1',
      });

    // Set up mock store
    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const spy = jest.spyOn(store, 'dispatch');

    // dispatch the action through the mock store and
    // get the result action to compare with the expected response
    await store.dispatch(addCategory({
      name: 'Category 1',
      description: 'Description of Category 1',
    }));

    expect(spy.type).toBe(CategoriesAction.ADD_CATEGORY);
    // const actions = store.getActions();
    // const actionTriggered = actions.find(action
    // => action.type === CategoriesAction.ADD_CATEGORY);
    // expect(actionTriggered.promise).toEqual(response);
  });
});

describe('getCategories', () => {
  it('should return correct action object', async () => {
    const response = get('/categories?offset=0&limit=10');

    // Set up mock store
    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    // dispatch the action through the mock store and
    // get the result action to compare with the expected response
    await store.dispatch(getCategories(0, 10));
    const actions = store.getActions();
    const actionTriggered = actions.find(action => action.type === CategoriesAction.GET_CATEGORIES);
    expect(actionTriggered.promise).toEqual(response);
  });
});

describe('selectCurrentCategory', () => {
  it('should return correct action object', async () => {
    const response = { currentCategory: 2 };

    // Set up mock store
    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    // dispatch the action through the mock store and
    // get the result action to compare with the expected response
    await store.dispatch(selectCurrentCategory(2));
    const actions = store.getActions();
    const actionTriggered = actions.find(
      action => action.type === CategoriesAction.SELECT_CURRENT_CATEGORY,
    );
    expect(actionTriggered.payload).toEqual(response);
  });
});
