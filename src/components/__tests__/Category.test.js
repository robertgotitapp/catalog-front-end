import React from 'react';
import { shallow } from 'enzyme';
import { Category } from '../Category';

describe('components/Category', () => {
  const props = {
    category: {
      created: '2019-06-12T03:17:40+00:00',
      description: 'fsfdfdfasdf',
      id: 1,
      name: 'Umbrella',
      updated: '2019-06-12T03:17:40+00:00',
    },
  };
  const container = shallow(<Category {...props} />);

  it('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });

  it('should contain category name', () => {
    expect(container.find('div')).toHaveLength(1);
  });
});
