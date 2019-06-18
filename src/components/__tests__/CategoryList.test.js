import React from 'react';
import { shallow } from 'enzyme';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { CategoryList } from '../CategoryList';
import { getCategories } from '../../actions/categories';

describe('components/CategoryList', () => {
  const props = {
    categories: {
      1: {
        created: '2019-06-17T13:46:18+00:00',
        description: 'Laptop',
        id: 1,
        name: 'Laptop',
        updated: '2019-06-17T13:46:18+00:00',
      },
      2: {
        created: '2019-06-17T13:46:25+00:00',
        description: 'Books',
        id: 2,
        name: 'Books',
        updated: '2019-06-17T13:46:25+00:00',
      },
      3: {
        created: '2019-06-17T13:46:48+00:00',
        description: 'Speaker',
        id: 3,
        name: 'Speaker',
        updated: '2019-06-17T13:46:48+00:00',
      },
    },
    getCategories: jest.fn(() => Promise.resolve()),
  };
  const container = shallow(<CategoryList {...props} />);
  container.setState({ loading: false });

  it('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });

  it('should contain exact number of categories', () => {
    expect(container.find(ListGroupItem)).toHaveLength(3);
  });
});
