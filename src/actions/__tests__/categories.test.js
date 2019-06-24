import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addCategory, getCategories, selectCurrentCategory } from '../categories';
import { CategoriesAction, HeadersType } from '../../utils/const';
import { post, get } from '../../utils/requests';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('actions/categories', () => {
  const store = mockStore({});

  beforeEach(() => {
    store.clearActions();
  });

  it('should create ADD_CATEGORY when addCategory is called', async () => {
    store.dispatch(addCategory({
      name: 'Category 1',
      description: 'Description of Category 1',
    }));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: CategoriesAction.ADD_CATEGORY,
      promise: post('/categories',
        [HeadersType.CONTENTTYPE, HeadersType.AUTHORIZATION],
        {
          name: 'Category 1',
          description: 'Description of Category 1',
        }),
    });
  });

  it('should create GET_CATEGORIES when getCategories is called', async () => {
    store.dispatch(getCategories(0, 10));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: CategoriesAction.GET_CATEGORIES,
      promise: get('/categories?offset=0&limit=10'),
    });
  });

  it('should create SELECT_CURRENT_CATEGORY when selectCurrentCategory is called', () => {
    store.dispatch(selectCurrentCategory(1));
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: CategoriesAction.SELECT_CURRENT_CATEGORY,
      payload: { currentCategory: 1 },
    });
  });
});
