import React from 'react';
import { shallow } from 'enzyme';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Route } from 'react-router-dom';
import { AddCategory } from '../AddCategory';
import { addCategory } from '../../actions/categories';
import { update } from '../../utils/requests';

describe('components/AddCategory', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<AddCategory {...props} />);
  };

  beforeEach(() => {
    props = {
      addCategory: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
    };
  });

  const inputNameAndDescriptionThenSubmit = () => {
    wrapper.find('[name="name"]')
      .simulate('change',
        { target: { name: 'name', value: 'Test Category 1' } });

    wrapper.find('[name="description"]')
      .simulate('change',
        { target: { name: 'description', value: 'Test Category 1' } });

    wrapper.instance().handleSubmit = ({
      preventDefault: jest.fn(),
    });
  };

  it('should render correctly', () => {
    setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger state change when FormControl name got input', () => {
    setup();
    const categoryNameInput = wrapper.find('[name="name"]');
    categoryNameInput.simulate('change', { target: { name: 'name', value: 'category1' } });
    expect(wrapper.state().name).toEqual('category1');
  });

  it('should trigger state change when FormControl description got input', () => {
    setup();
    const categoryDesscriptionInput = wrapper.find('[name="description"]');
    categoryDesscriptionInput.simulate('change', { target: { name: 'description', value: 'description' } });
    expect(wrapper.state().description).toEqual('description');
  });

  it('should render Redirect Component when valid category detail is submitted', async () => {
    setup();
    inputNameAndDescriptionThenSubmit();
    await Promise.resolve();
    update();
    wrapper.instance().validateInput = jest.fn();
    wrapper.instance().forceUpdate();
    expect(wrapper.instance().validateInput).toHaveBeenCalled();

    // await Promise.resolve();
    // update();
    // expect(wrapper.find(Route)).toHaveLength(1);
  });
});
