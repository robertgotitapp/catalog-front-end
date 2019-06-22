import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../Home';

describe('components/Home', () => {
  const container = shallow(<Home />);

  it('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });
});
