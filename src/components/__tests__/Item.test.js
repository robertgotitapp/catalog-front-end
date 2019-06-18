import React from 'react';
import { shallow } from 'enzyme';
import { Item } from '../Item';

describe('components/Item', () => {
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
  };
  const container = shallow(<Item {...props} />);

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
});
