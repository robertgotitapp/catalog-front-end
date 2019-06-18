import { ItemsAction } from '../../utils/const';

const reducer = require('../items').default;

describe('reducers/itemsReducer', () => {
  it('add item success', () => {
    const action = {
      type: ItemsAction.ADD_ITEM_SUCCESS,
      payload: {
        category_id: 1,
        created: '2019-06-18T06:42:45+00:00',
        description: 'Item 15',
        id: 17,
        name: 'Item 15',
        price: 10,
        updated: '2019-06-18T06:42:45+00:00',
        user_id: 1,
      },
    };
    const result = reducer(undefined, action);
    expect(result[17]).toEqual({
      category_id: 1,
      created: '2019-06-18T06:42:45+00:00',
      description: 'Item 15',
      id: 17,
      name: 'Item 15',
      price: 10,
      updated: '2019-06-18T06:42:45+00:00',
      user_id: 1,
    });
  });

  it('get items success', () => {
    const action = {
      type: ItemsAction.GET_ITEMS_SUCCESS,
      payload: {
        total_items: 11,
        items: {
          17: {
            category_id: 1,
            created: '2019-06-18T06:42:45+00:00',
            description: 'Item 15',
            id: 17,
            name: 'Item 15',
            price: 10,
            updated: '2019-06-18T06:42:45+00:00',
            user_id: 1,
          },
        },
      },
    };
    const result = reducer(undefined, action);
    expect(result.items).toEqual({
      17: {
        category_id: 1,
        created: '2019-06-18T06:42:45+00:00',
        description: 'Item 15',
        id: 17,
        name: 'Item 15',
        price: 10,
        updated: '2019-06-18T06:42:45+00:00',
        user_id: 1,
      },
    });
  });

  it('update item success', () => {
    const action = {
      type: ItemsAction.UPDATE_ITEM_SUCCESS,
      payload: {
        category_id: 1,
        created: '2019-06-18T06:42:45+00:00',
        description: 'Item 16',
        id: 17,
        name: 'Item 16',
        price: 15,
        updated: '2019-06-18T06:42:45+00:00',
        user_id: 1,
      },
    };
    const result = reducer(undefined, action);
    expect(result[17]).toEqual({
      category_id: 1,
      created: '2019-06-18T06:42:45+00:00',
      description: 'Item 16',
      id: 17,
      name: 'Item 16',
      price: 15,
      updated: '2019-06-18T06:42:45+00:00',
      user_id: 1,
    });
  });

  it('select item page', () => {
    const action = {
      type: ItemsAction.SELECT_ITEM_PAGE,
      payload: {
        currentPage: 2,
      },
    };
    const result = reducer(undefined, action);
    expect(result.currentPage).toEqual(2);
  });
});
