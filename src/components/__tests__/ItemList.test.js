import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import PageItem from 'react-bootstrap/PageItem';
import { ItemList } from '../ItemList';
import { getItems, selectItemPage } from '../../actions/items';

describe('components/ItemList', () => {
  const props = {
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
    getItems,
    selectItemPage,
  };
  const container = shallow(<ItemList {...props} />);
  container.setState({ loading: false });

  it('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });

  it('should contain exact number of item links', () => {
    expect(container.find(Link)).toHaveLength(10);
  });

  it('should contain exact number of PageItem', () => {
    expect(container.find(PageItem)).toHaveLength(2);
  });

  it('should contain exact number of clickable link', () => {
    expect(container.find('[name="clickablePage"]')).toHaveLength(1);
  });

  it('should trigger goToPage handler when clickable page is clicked', () => {
    container.instance().goToPage = jest.fn();
    container.instance().forceUpdate();
    const form = container.find('[name="clickablePage"]');
    form.simulate('click');
    expect(container.instance().goToPage).toHaveBeenCalled();
  });
});
