import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';

describe('components/Home', () => {
  const container = shallow(<App />);

  it('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });
});
