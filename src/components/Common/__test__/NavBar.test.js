import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from '../NavBar';

describe('components/NavBar', () => {
  describe('when user is logged in', () => {
    const props = {
      currentLoggedId: 1,
      signOut: jest.fn(),
      history: { push: jest.fn() },
    };
    const wrapper = shallow(<NavBar {...props} />);

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have 1 Add Category Link', () => {
      expect(wrapper.find('[name="addcategory"]')).toHaveLength(1);
    });

    it('should have 1 Home Link', () => {
      expect(wrapper.find('[name="home"]')).toHaveLength(1);
    });

    it('should have 1 Add Item Link', () => {
      expect(wrapper.find('[name="additem"]')).toHaveLength(1);
    });

    it('should trigger handler when Sign Out is clicked', () => {
      wrapper.instance().handleSignOut({
        preventDefault: jest.fn(),
      });
      expect(props.signOut).toHaveBeenCalled();
      expect(props.history.push).toBeCalled();
    });
  });

  describe('when user is not logged in', () => {
    const props = {
      currentLoggedId: null,
      signOut: jest.fn(),
      history: { push: jest.fn() },
    };
    const wrapper = shallow(<NavBar {...props} />);

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have 1 Sign In Link', () => {
      expect(wrapper.find('[name="signin"]')).toHaveLength(1);
    });

    it('should have 1 Home Link', () => {
      expect(wrapper.find('[name="home"]')).toHaveLength(1);
    });

    it('should have 1 Sign Out Link', () => {
      expect(wrapper.find('[name="signup"]')).toHaveLength(1);
    });
  });
});
