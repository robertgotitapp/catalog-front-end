import React from 'react';
import { shallow } from 'enzyme';
import { Main } from '../Main';

describe('components/Home', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<Main {...props} />);
  };

  it('should render correctly when logged in', () => {
    props = {
      loadCurrentUserData: jest.fn(),
      getCategories: jest.fn(),
      currentLoggedId: 1,
    };
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when logged out', () => {
    props = {
      loadCurrentUserData: jest.fn(),
      getCategories: jest.fn(),
      currentLoggedId: 0,
    };
    setup();
    expect(wrapper).toMatchSnapshot();
  });
});
