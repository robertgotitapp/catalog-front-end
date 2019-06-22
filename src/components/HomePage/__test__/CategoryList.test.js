import React from 'react';
import { shallow } from 'enzyme';
import { CategoryList } from '../CategoryList';

describe('components/CategoryList', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      categories: {
        1: {
          created: '2019-06-17T13:46:18+00:00',
          description: 'Laptop',
          id: 1,
          name: 'Laptop',
          updated: '2019-06-17T13:46:18+00:00',
        },
        2: {
          created: '2019-06-17T13:46:25+00:00',
          description: 'Books',
          id: 2,
          name: 'Books',
          updated: '2019-06-17T13:46:25+00:00',
        },
        3: {
          created: '2019-06-17T13:46:48+00:00',
          description: 'Speaker',
          id: 3,
          name: 'Speaker',
          updated: '2019-06-17T13:46:48+00:00',
        },
      },
      currentCategory: 1,
      getCategories: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      selectCurrentCategory: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      getItems: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      selectItemPage: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
    };
  });

  const setup = () => {
    wrapper = shallow(<CategoryList {...props} />);
    wrapper.setState({ loading: false });
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should fire calls to api when any category is clicked', () => {
    setup();
    wrapper.find('[name="2"]').simulate('click', {
      target: { name: '2' },
    });
    expect(props.selectCurrentCategory).toHaveBeenCalled();
    expect(props.selectItemPage).toHaveBeenCalled();
    expect(props.getItems).toHaveBeenCalled();
  });
});
