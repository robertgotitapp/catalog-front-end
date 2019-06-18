import React from 'react';
import { shallow } from 'enzyme';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { SignUpPage } from '../SignUpPage';

describe('components/SignUpPage', () => {
  const props = {};
  const container = shallow(<SignUpPage {...props} />);

  it('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });

  it('should contain 1 FormControl for username', () => {
    expect(container.find('[name="username"]')).toHaveLength(1);
  });

  it('should contain 1 FormControl for password', () => {
    expect(container.find('[name="password"]')).toHaveLength(1);
  });

  it('should contain 1 FormControl for email', () => {
    expect(container.find('[name="email"]')).toHaveLength(1);
  });

  it('should contain 1 FormControl for name', () => {
    expect(container.find('[name="name"]')).toHaveLength(1);
  });

  it('should trigger state change when FormControl username got input', () => {
    const usernameInput = container.find('[name="username"]');
    usernameInput.simulate('change', { target: { name: 'username', value: 'user1' } });
    expect(container.state().username).toEqual('user1');
  });

  it('should trigger state change when FormControl password got input', () => {
    const passwordInput = container.find('[name="password"]');
    passwordInput.simulate('change', { target: { name: 'password', value: 'Password1' } });
    expect(container.state().password).toEqual('Password1');
  });

  it('should trigger state change when FormControl email got input', () => {
    const emailInput = container.find('[name="email"]');
    emailInput.simulate('change', { target: { name: 'email', value: 'user1@gmail.com' } });
    expect(container.state().email).toEqual('user1@gmail.com');
  });

  it('should trigger state change when FormControl name got input', () => {
    const nameInput = container.find('[name="name"]');
    nameInput.simulate('change', { target: { name: 'name', value: 'User Name' } });
    expect(container.state().name).toEqual('User Name');
  });

  it('should trigger handler when form is submited', () => {
    container.instance().handleSubmit = jest.fn();
    container.instance().forceUpdate();
    const form = container.find(Form);
    form.simulate('submit');
    expect(container.instance().handleSubmit).toHaveBeenCalled();
  });

  it('should trigger alert when there is error message', () => {
    container.setState({
      username: '',
      password: '',
      name: '',
      email: '',
      toHome: false,
      toSignIn: false,
      alerts: {
        email: 'has been registed with different account',
      },
    });
    expect(container.find(Alert)).toHaveLength(1);
  });
});
