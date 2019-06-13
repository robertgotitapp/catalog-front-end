import { CategoriesAction } from '../../utils/const';

const reducer = require('../categories').default;

describe('reducers/categories', () => {
  it('add category success', () => {
    const action = {
      type: CategoriesAction.ADD_CATEGORY_SUCCESS,
      payload: {
        created: '2019-06-12T03:17:40+00:00',
        description: 'fsfdfdfasdf',
        id: 1,
        name: 'fdafdsafdsa',
        updated: '2019-06-12T03:17:40+00:00',
      },
    };
    const result = reducer(undefined, action);
    expect(result[1]).toEqual({
      created: '2019-06-12T03:17:40+00:00',
      description: 'fsfdfdfasdf',
      id: 1,
      name: 'fdafdsafdsa',
      updated: '2019-06-12T03:17:40+00:00',
    });
  });

  it('get categories success', () => {
    const action = {
      type: CategoriesAction.GET_CATEGORIES_SUCCESS,
      payload: {
        total_categories: 2,
        categories: {
          0: {
            created: '2019-06-12T03:17:40+00:00',
            description: 'fsfdfdfasdf',
            id: 1,
            name: 'fdafdsafdsa',
            updated: '2019-06-12T03:17:40+00:00',
          },
          1: {
            created: '2019-06-13T14:32:34+00:00',
            description: 'This is actually my favorite category',
            id: 2,
            name: 'hasds',
            updated: '2019-06-13T14:32:34+00:00',
          },
        },
      },
    };
    const result = reducer(undefined, action);
    expect(result.categories).toEqual({
      0: {
        created: '2019-06-12T03:17:40+00:00',
        description: 'fsfdfdfasdf',
        id: 1,
        name: 'fdafdsafdsa',
        updated: '2019-06-12T03:17:40+00:00',
      },
      1: {
        created: '2019-06-13T14:32:34+00:00',
        description: 'This is actually my favorite category',
        id: 2,
        name: 'hasds',
        updated: '2019-06-13T14:32:34+00:00',
      },
    });
  });
});
