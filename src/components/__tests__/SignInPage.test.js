import React from 'react';
import { shallow } from 'enzyme';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { SignInPage } from '../SignInPage';

describe('components/SignInPage', () => {
  const props = {};
  const container = shallow(<SignInPage {...props} />);

  it('should render correctly', () => {
    expect(container).toMatchSnapshot();
  });

  it('should contain 1 FormControl for username', () => {
    expect(container.find('[name="username"]')).toHaveLength(1);
  });

  it('should contain 1 FormControl for password', () => {
    expect(container.find('[name="password"]')).toHaveLength(1);
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
      toHome: false,
      alerts: 'Invalid credentials',
    });
    expect(container.find(Alert)).toHaveLength(1);
  });
});
