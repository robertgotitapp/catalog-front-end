import React from 'react';
import { shallow } from 'enzyme';
import Form from 'react-bootstrap/Form';
import { AddCategory } from '../AddCategory';

describe('components/AddCategory', () => {
  const props = {};
  const container = shallow(<AddCategory {...props} />);

  it('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });

  it('should contain 1 FormControl for name', () => {
    expect(container.find('[name="name"]')).toHaveLength(1);
  });

  it('should contain 1 FormControl for description', () => {
    expect(container.find('[name="description"]')).toHaveLength(1);
  });

  it('should trigger state change when FormControl name got input', () => {
    const categoryNameInput = container.find('[name="name"]');
    categoryNameInput.simulate('change', { target: { name: 'name', value: 'category1' } });
    expect(container.state().name).toEqual('category1');
  });

  it('should trigger state change when FormControl description got input', () => {
    const categoryDesscriptionInput = container.find('[name="description"]');
    categoryDesscriptionInput.simulate('change', { target: { name: 'description', value: 'description' } });
    expect(container.state().description).toEqual('description');
  });

  it('should trigger handler when form is submited', () => {
    container.instance().handleSubmit = jest.fn();
    container.instance().forceUpdate();
    const form = container.find(Form);
    form.simulate('submit');
    expect(container.instance().handleSubmit).toHaveBeenCalled();
  });
});
