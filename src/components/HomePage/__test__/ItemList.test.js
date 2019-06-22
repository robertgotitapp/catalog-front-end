import React from 'react';
import { shallow } from 'enzyme';
import { ItemList } from '../ItemList';

describe('components/ItemList', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      items: {
        4: {
          category_id: 1,
          created: '2019-06-17T13:49:00+00:00',
          description: 'Item 4',
          id: 4,
          name: 'Item 4',
          price: 19,
          updated: '2019-06-17T13:49:00+00:00',
        },
        5: {
          category_id: 1,
          created: '2019-06-17T13:49:00+00:00',
          description: 'Item 4',
          id: 5,
          name: 'Item 4',
          price: 19,
          updated: '2019-06-17T13:49:00+00:00',
        },
        6: {
          category_id: 1,
          created: '2019-06-17T13:49:00+00:00',
          description: 'Item 4',
          id: 6,
          name: 'Item 6',
          price: 19,
          updated: '2019-06-17T13:49:00+00:00',
        },
        7: {
          category_id: 1,
          created: '2019-06-17T13:49:00+00:00',
          description: 'Item 4',
          id: 7,
          name: 'Item 4',
          price: 19,
          updated: '2019-06-17T13:49:00+00:00',
        },
        8: {
          category_id: 1,
          created: '2019-06-17T13:49:00+00:00',
          description: 'Item 4',
          id: 8,
          name: 'Item 4',
          price: 19,
          updated: '2019-06-17T13:49:00+00:00',
        },
        9: {
          category_id: 1,
          created: '2019-06-17T13:49:00+00:00',
          description: 'Item 4',
          id: 9,
          name: 'Item 4',
          price: 19,
          updated: '2019-06-17T13:49:00+00:00',
        },
        10: {
          category_id: 1,
          created: '2019-06-17T13:49:00+00:00',
          description: 'Item 4',
          id: 10,
          name: 'Item 4',
          price: 19,
          updated: '2019-06-17T13:49:00+00:00',
        },
        11: {
          category_id: 1,
          created: '2019-06-17T13:49:00+00:00',
          description: 'Item 4',
          id: 11,
          name: 'Item 4',
          price: 19,
          updated: '2019-06-17T13:49:00+00:00',
        },
        12: {
          category_id: 1,
          created: '2019-06-17T13:49:00+00:00',
          description: 'Item 4',
          id: 12,
          name: 'Item 4',
          price: 19,
          updated: '2019-06-17T13:49:00+00:00',
        },
        13: {
          category_id: 1,
          created: '2019-06-17T13:49:00+00:00',
          description: 'Item 4',
          id: 13,
          name: 'Item 4',
          price: 19,
          updated: '2019-06-17T13:49:00+00:00',
        },
      },
      itemIds: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      selectedCategory: {
        created: '2019-06-17T13:46:18+00:00',
        description: 'Laptop',
        id: 1,
        name: 'Laptop',
        updated: '2019-06-17T13:46:18+00:00',
      },
      currentPage: 1,
      pageList: [1, 2],
      getItems: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      selectItemPage: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
    };
  });

  const setup = () => {
    wrapper = shallow(<ItemList {...props} />);
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should fire correct calls to api', () => {
    setup();
    wrapper.find('[name=2]').simulate('click', {
      target: { innerHTML: '2' },
    });
    expect(props.selectItemPage).toHaveBeenCalled();
    expect(props.getItems).toHaveBeenCalled();
  });
});
