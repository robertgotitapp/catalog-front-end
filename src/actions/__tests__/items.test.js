import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addItem, getItems, removeItem, updateItem,
} from '../items';
import { ItemsAction, HeadersType } from '../../utils/const';
import {
  post, get, update, remove,
} from '../../utils/requests';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('actions/items', () => {
  const store = mockStore({});

  beforeEach(() => {
    store.clearActions();
  });

  it('should create ADD_ITEM when addItem is called', async () => {
    store.dispatch(addItem(1, {
      name: 'Item 1',
      description: 'Description of Item 1',
      price: 11,
    }));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: ItemsAction.ADD_ITEM,
      promise: post('/categories/1/items',
        [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
        {
          name: 'Item 1',
          description: 'Description of Item 1',
          price: 11,
        }),
    });
  });

  it('should create GET_ITEMS when getItems is called', async () => {
    store.dispatch(getItems(1, 0, 10));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: ItemsAction.GET_ITEMS,
      promise: get('/categories/1/items?offset=0&limit=10'),
    });
  });

  it('should create UPDATE_ITEM when updateItem is called', async () => {
    store.dispatch(updateItem(1, 1, {
      name: 'Category 1',
      description: 'Description of Category 1',
      price: 11,
    }));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: ItemsAction.UPDATE_ITEM,
      promise: update(
        '/categories/1/items/1',
        [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
        {
          name: 'Category 1',
          description: 'Description of Category 1',
          price: 11,
        },
      ),
    });
  });

  it('should create DELETE_ITEM when removeItem is called', async () => {
    store.dispatch(removeItem(1, 1));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: ItemsAction.DELETE_ITEM,
      promise: remove('/categories/1/items/1',
        [HeadersType.AUTHORIZATION]),
    });
  });
});
