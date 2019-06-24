import React from 'react';
import { shallow } from 'enzyme';
import Alert from 'react-bootstrap/Alert';
import { AddCategory } from '../AddCategory';
import { update } from '../../../utils/requests';

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
      history: { push: jest.fn() },
    };
  });

  const inputValidNameAndDescription = () => {
    wrapper.find('[name="name"]')
      .simulate('change',
        { target: { name: 'name', value: 'Test Category 1' } });

    wrapper.find('[name="description"]')
      .simulate('change',
        { target: { name: 'description', value: 'Test Category 1' } });
  };

  const inputInvalidNameAndDescription = () => {
    wrapper.find('[name="name"]')
      .simulate('change',
        { target: { name: 'name', value: 'Tet' } });

    wrapper.find('[name="description"]')
      .simulate('change',
        {
          target: {
            name: 'description',
            value: 'rojt9QGe5MP7AXXYzi9SmREjtBkLg9OTMUHO9WKkujABJPbx2gAcNC'
              + 'y11WkuXZ52dPzHE95m72q1HOeAcfQkAQ7gJbh9kiWBSac7OnW4Vu2hrpkGYk1T1gVJoeBD'
              + 'LLFO3GsB5uo9YYQOiURst6MEXkS3jW2aIBEF2tYIabAJups0nDb3M7y8fExN7M4EqriAxR4cctrItgi5te72e9IHj7zYvh8y',
          },
        });
  };

  const submitForm = () => {
    wrapper.instance().handleSubmit({
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

  it('should trigger history push function when valid category detail is submitted', async () => {
    setup();
    inputValidNameAndDescription();
    submitForm();
    await Promise.resolve();
    expect(props.history.push).toBeCalled();
  });

  it('should render Alert when invalid cateogry detail is submitted', async () => {
    setup();
    inputInvalidNameAndDescription();
    submitForm();
    expect(wrapper.find(Alert)).toHaveLength(2);
  });

  it('should display alerts if the request to api is failed', async () => {
    props = {
      addCategory: jest.fn(() => Promise.resolve({
        statusCode: 0,
        errors: {
          message: {
            name: 'Category name already existed',
          },
        },
      })),
    };
    setup();
    inputValidNameAndDescription();
    submitForm();
    await Promise.resolve();
    await Promise.resolve();
    expect(wrapper.find(Alert)).toHaveLength(1);
  });
});
