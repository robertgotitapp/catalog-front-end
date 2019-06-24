import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../Home';

describe('components/Home', () => {
  const props = {
    match: {
      params: {
        categoryId: 1,
        pageNumber: 1,
      },
      history: {},
    },
  };

  const container = shallow(<Home {...props} />);

  it('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });
});
