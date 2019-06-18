import React from 'react';
import { shallow } from 'enzyme';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { ItemDetail } from '../ItemDetail';
import {
  getItems,
  removeItem,
  selectItemPage,
} from '../../actions/items';

describe('components/AddItem', () => {
  const props = {
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
    getItems,
    removeItem,
    selectItemPage,
  };
  const container = shallow(<ItemDetail {...props} />);

  it('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });

  it('should contain exact number of item name', () => {
    expect(container.find('[name="name"]')).toHaveLength(1);
  });

  it('should contain exact number of item price', () => {
    expect(container.find('[name="price"]')).toHaveLength(1);
  });

  it('should contain exact number of item description', () => {
    expect(container.find('[name="description"]')).toHaveLength(1);
  });

  it('should trigger deleteItem handler when form is Remove button is clicked', () => {
    container.instance().deleteItem = jest.fn();
    container.instance().forceUpdate();
    const removeBtn = container.find('[name="removeBtn"]');
    removeBtn.simulate('click');
    expect(container.instance().deleteItem).toHaveBeenCalled();
  });

  it('should trigger alert when there is error message', () => {
    container.setState({
      toHome: false,
      alerts: 'User is not authorized',
    });
    expect(container.find(Alert)).toHaveLength(1);
  });
});
