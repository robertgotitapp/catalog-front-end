import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from '../NavBar';

describe('components/NavBar', () => {
  describe('when user is logged in', () => {
    const props = {
      isLoggedIn: true,
    };
    const container = shallow(<NavBar {...props} />);

    it('should render correctly', () => {
      expect(container).toMatchSnapshot();
    });

    it('should have 1 Add Category Link', () => {
      expect(container.find('[name="addcategory"]')).toHaveLength(1);
    });

    it('should have 1 Home Link', () => {
      expect(container.find('[name="home"]')).toHaveLength(1);
    });

    it('should have 1 Add Item Link', () => {
      expect(container.find('[name="additem"]')).toHaveLength(1);
    });

    it('should trigger handler when Sign Out is clicked', () => {
      container.instance().handleSignOut = jest.fn();
      container.instance().forceUpdate();
      const signOutLink = container.find('[name="signout"]');
      signOutLink.simulate('click');
      expect(container.instance().handleSignOut).toHaveBeenCalled();
    });
  });

  describe('when user is not logged in', () => {
    const props = {
      isLoggedIn: false,
    };
    const container = shallow(<NavBar {...props} />);

    it('should render correctly', () => {
      expect(container).toMatchSnapshot();
    });

    it('should have 1 Sign In Link', () => {
      expect(container.find('[name="signin"]')).toHaveLength(1);
    });

    it('should have 1 Home Link', () => {
      expect(container.find('[name="home"]')).toHaveLength(1);
    });

    it('should have 1 Sign Out Link', () => {
      expect(container.find('[name="signup"]')).toHaveLength(1);
    });
  });
});
