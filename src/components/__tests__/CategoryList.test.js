import React from 'react';
import { shallow } from 'enzyme';
import { CategoryList } from '../CategoryList';
import { Category } from '../Category';
import { getCategories } from '../../actions/categories';

describe('components/CategoryList', () => {
  const props = {
    categoriesIds: [0, 1, 2],
    getCategories,
  };
  const container = shallow(<CategoryList {...props} />);

  it('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });

  it('should contain exact number of categories', () => {
    expect(container.find(Category)).toHaveLength(3);
  });
});
