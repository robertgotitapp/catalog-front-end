import React from 'react';
import { shallow } from 'enzyme';
import Main from '../Main';

describe('components/Home', () => {
  const container = shallow(<Main />);

  it('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });
});
