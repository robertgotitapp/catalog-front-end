import React from 'react';
import { shallow } from 'enzyme';
import Alert from 'react-bootstrap/Alert';
import { ItemDetail } from '../ItemDetail';

describe('components/ItemDetail', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      item: {
        category_id: 1,
        created: '2019-06-17T13:49:00+00:00',
        description: 'Item 4',
        id: 11,
        name: 'Item 4',
        price: 19,
        updated: '2019-06-17T13:49:00+00:00',
      },
      selectedCategory: {
        created: '2019-06-17T13:46:18+00:00',
        description: 'Laptop',
        id: 1,
        name: 'Laptop',
        updated: '2019-06-17T13:46:18+00:00',
      },
      currentPage: 1,
      getItems: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      removeItem: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      selectItemPage: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      isAuthorized: true,
    };
  });

  const clickDeleteBtn = () => {
    wrapper.instance().deleteItem({
      preventDefault: jest.fn(),
    });
  };

  const setup = () => {
    wrapper = shallow(<ItemDetail {...props} />);
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when user is not authorized to change or user is not logged in', () => {
    props = {
      item: {
        category_id: 1,
        created: '2019-06-17T13:49:00+00:00',
        description: 'Item 4',
        id: 11,
        name: 'Item 4',
        price: 19,
        updated: '2019-06-17T13:49:00+00:00',
      },
      selectedCategory: {
        created: '2019-06-17T13:46:18+00:00',
        description: 'Laptop',
        id: 1,
        name: 'Laptop',
        updated: '2019-06-17T13:46:18+00:00',
      },
      currentPage: 1,
      getItems: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      removeItem: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      selectItemPage: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      isAuthorized: false,
    };
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should set toHome state to true when delete item successfully', async () => {
    setup();
    clickDeleteBtn();
    await Promise.resolve();
    expect(wrapper.state().toHome).toEqual(true);
  });

  it('should trigger alert when delete item request is failed', async () => {
    props = {
      item: {
        category_id: 1,
        created: '2019-06-17T13:49:00+00:00',
        description: 'Item 4',
        id: 11,
        name: 'Item 4',
        price: 19,
        updated: '2019-06-17T13:49:00+00:00',
      },
      selectedCategory: {
        created: '2019-06-17T13:46:18+00:00',
        description: 'Laptop',
        id: 1,
        name: 'Laptop',
        updated: '2019-06-17T13:46:18+00:00',
      },
      currentPage: 1,
      getItems: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      removeItem: jest.fn(() => Promise.resolve({
        statusCode: 0,
        errorPromise: Promise.resolve({
          description: 'Failed to delete item',
        }),
      })),
      selectItemPage: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
    };
    setup();
    clickDeleteBtn();
    await Promise.resolve();
    expect(wrapper.find(Alert)).toHaveLength(1);
  });
});
