import React from 'react';
import { shallow } from 'enzyme';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { UpdateItem } from '../UpdateItem';
import { updateItem } from '../../actions/items';

describe('components/UpdateItem', () => {
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
    currentCategory: {
      created: '2019-06-17T13:46:18+00:00',
      description: 'Laptop',
      id: 1,
      name: 'Laptop',
      updated: '2019-06-17T13:46:18+00:00',
    },
    updateItem,
  };
  const container = shallow(<UpdateItem {...props} />);

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

  it('should trigger state change when FormControl name got input', () => {
    const itemNameInput = container.find('[name="name"]');
    itemNameInput.simulate('change', { target: { name: 'name', value: 'item 1' } });
    expect(container.state().name).toEqual('item 1');
  });

  it('should trigger state change when FormControl description got input', () => {
    const itemDescriptionInput = container.find('[name="description"]');
    itemDescriptionInput.simulate('change', { target: { name: 'description', value: 'description' } });
    expect(container.state().description).toEqual('description');
  });

  it('should trigger state change when FormControl price got input', () => {
    const itemPriceInput = container.find('[name="price"]');
    itemPriceInput.simulate('change', { target: { name: 'price', value: 100 } });
    expect(container.state().price).toEqual(100);
  });

  it('should trigger handleSubmit handler when form is submitted', () => {
    container.instance().handleSubmit = jest.fn();
    container.instance().forceUpdate();
    const form = container.find(Form);
    form.simulate('submit');
    expect(container.instance().handleSubmit).toHaveBeenCalled();
  });

  it('should trigger alert when there is error message', () => {
    container.setState({
      name: 'Item 4',
      price: 19,
      description: 'Item 4',
      toHome: false,
      alerts: {
        name: 'Name has to be at least 5 characters length',
      },
    });
    expect(container.find(Alert)).toHaveLength(1);
  });
});
