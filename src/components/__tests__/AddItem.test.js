import React from 'react';
import { shallow } from 'enzyme';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { AddItem } from '../AddItem';
import { addItem } from '../../actions/items';

describe('components/AddItem', () => {
  const props = {
    categoryIds: [1, 2, 3, 4],
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
      4: {
        created: '2019-06-17T13:47:17+00:00',
        description: 'Vehicle',
        id: 4,
        name: 'Vehicle',
        updated: '2019-06-17T13:47:17+00:00',
      },
    },
    addItem,
  };
  const container = shallow(<AddItem {...props} />);

  it('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });

  it('should contain 1 FormControl for name', () => {
    expect(container.find('[name="name"]')).toHaveLength(1);
  });

  it('should contain 1 FormControl for description', () => {
    expect(container.find('[name="description"]')).toHaveLength(1);
  });

  it('should contain 1 FormControl for price', () => {
    expect(container.find('[name="price"]')).toHaveLength(1);
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

  it('should trigger handler when form is submited', () => {
    container.instance().handleSubmit = jest.fn();
    container.instance().forceUpdate();
    const form = container.find(Form);
    form.simulate('submit');
    expect(container.instance().handleSubmit).toHaveBeenCalled();
  });

  it('should trigger alert when there is error message', () => {
    container.setState({
      name: '',
      price: 0,
      description: '',
      selectedCategory: 1,
      toHome: false,
      alerts: {
        name: 'Name length has to at least 5 characters',
      },
    });
    expect(container.find(Alert)).toHaveLength(1);
  });
});
