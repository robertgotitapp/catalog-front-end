import configureStore from 'redux-mock-store';
import {
  addItem, getItems, removeItem, updateItem,
} from '../items';
import { ItemsAction, HeadersType } from '../../utils/const';
import {
  post, get, update, remove,
} from '../../utils/requests';
import { Item } from '../../components/Item';

describe('addItem', () => {
  it('should return correct action object', async () => {
    const response = post('/categories/1/items',
      [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
      {
        name: 'Item 1',
        description: 'Description of Item 1',
        price: 11,
      });

    // Set up mock store
    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    // dispatch the action through the mock store and
    // get the result action to compare with the expected response
    await store.dispatch(addItem(
      1,
      {
        name: 'Category 1',
        description: 'Description of Category 1',
      },
    ));

    const actions = store.getActions();
    const actionTriggered = actions.find(action => action.type === ItemsAction.ADD_ITEM);
    expect(actionTriggered.promise).toEqual(response);
  });
});

describe('getItems', () => {
  it('should return correct action object', async () => {
    const response = get('/categories/1/items?offset=0&limit=10');

    // Set up mock store
    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    // dispatch the action through the mock store and
    // get the result action to compare with the expected response
    await store.dispatch(getItems(1, 0, 10));
    const actions = store.getActions();
    const actionTriggered = actions.find(action => action.type === ItemsAction.GET_ITEMS);
    expect(actionTriggered.promise).toEqual(response);
  });
});

describe('updateItem', () => {
  it('should return correct action object', async () => {
    const response = update('/categories/1/items/1',
      [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
      {
        name: 'Item 1',
        description: 'Description of Item 1',
        price: 11,
      });

    // Set up mock store
    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    // dispatch the action through the mock store and
    // get the result action to compare with the expected response
    await store.dispatch(updateItem(
      1,
      1,
      {
        name: 'Category 1',
        description: 'Description of Category 1',
        price: 11,
      },
    ));

    const actions = store.getActions();
    const actionTriggered = actions.find(action => action.type === ItemsAction.UPDATE_ITEM);
    expect(actionTriggered.promise).toEqual(response);
  });
});

describe('removeItem', () => {
  it('should return correct action object', async () => {
    const response = update('/categories/1/items/1',
      [HeadersType.AUTHORIZATION]);

    // Set up mock store
    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    // dispatch the action through the mock store and
    // get the result action to compare with the expected response
    await store.dispatch(removeItem(
      1,
      1,
    ));

    const actions = store.getActions();
    const actionTriggered = actions.find(action => action.type === ItemsAction.DELETE_ITEM);
    expect(actionTriggered.promise).toEqual(response);
  });
});

describe('selectItemPage', () => {
  it('should return correct action object', async () => {
    const response = { currentPage: 2 };

    // Set up mock store
    const initialState = {};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    // dispatch the action through the mock store and
    // get the result action to compare with the expected response
    await store.dispatch(selectItemPage(2));

    const actions = store.getActions();
    const actionTriggered = actions.find(action => action.type === ItemsAction.SELECT_ITEM_PAGE);
    expect(actionTriggered.payload).toEqual(response);
  });
});
