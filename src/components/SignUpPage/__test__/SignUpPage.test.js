import React from 'react';
import { shallow } from 'enzyme';
import Alert from 'react-bootstrap/Alert';
import { SignUpPage } from '../SignUpPage';

describe('components/SignUpPage', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      signUp: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      signIn: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      getUserData: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
    };
  });

  const setup = () => {
    wrapper = shallow(<SignUpPage {...props} />);
  };

  const inputValidUserData = () => {
    wrapper.find('[name="username"]')
      .simulate('change',
        { target: { name: 'username', value: 'robert1' } });

    wrapper.find('[name="password"]')
      .simulate('change',
        { target: { name: 'password', value: 'Password1' } });

    wrapper.find('[name="name"]')
      .simulate('change',
        { target: { name: 'name', value: 'robert1' } });

    wrapper.find('[name="email"]')
      .simulate('change',
        { target: { name: 'email', value: 'robert1@gmail.com' } });
  };

  const inputInvalidUserData = () => {
    wrapper.find('[name="username"]')
      .simulate('change',
        { target: { name: 'username', value: 'ro1' } });

    wrapper.find('[name="password"]')
      .simulate('change',
        { target: { name: 'password', value: 'ssword1' } });

    wrapper.find('[name="name"]')
      .simulate('change',
        { target: { name: 'name', value: 'rob' } });

    wrapper.find('[name="email"]')
      .simulate('change',
        { target: { name: 'email', value: 'rober' } });
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

  it('should trigger state change when FormControl username got input', () => {
    setup();
    const usernameInput = wrapper.find('[name="username"]');
    usernameInput.simulate('change', { target: { name: 'username', value: 'user1' } });
    expect(wrapper.state().username).toEqual('user1');
  });

  it('should trigger state change when FormControl password got input', () => {
    setup();
    const passwordInput = wrapper.find('[name="password"]');
    passwordInput.simulate('change', { target: { name: 'password', value: 'Password1' } });
    expect(wrapper.state().password).toEqual('Password1');
  });

  it('should trigger state change when FormControl email got input', () => {
    setup();
    const emailInput = wrapper.find('[name="email"]');
    emailInput.simulate('change', { target: { name: 'email', value: 'user1@gmail.com' } });
    expect(wrapper.state().email).toEqual('user1@gmail.com');
  });

  it('should trigger state change when FormControl name got input', () => {
    setup();
    const nameInput = wrapper.find('[name="name"]');
    nameInput.simulate('change', { target: { name: 'name', value: 'User Name' } });
    expect(wrapper.state().name).toEqual('User Name');
  });

  it('should change state toHome to true when valid user data is submitted', async () => {
    setup();
    inputValidUserData();
    submitForm();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(wrapper.state().toHome).toEqual(true);
  });

  it('should change state toSignIn to true when signUp request is success and signIn request is failed', async () => {
    props = {
      signUp: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      signIn: jest.fn(() => Promise.resolve({
        statusCode: 0,
      })),
      getUserData: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
    };
    setup();
    inputValidUserData();
    submitForm();
    await Promise.resolve();
    await Promise.resolve();
    expect(wrapper.state().toSignIn).toEqual(true);
  });

  it('should display Alerts when signUp request is Failed', async () => {
    props = {
      signUp: jest.fn(() => Promise.resolve({
        statusCode: 0,
        errorPromise: Promise.resolve({
          message: {
            name: 'Username has been taken',
          },
        }),
      })),
      signIn: jest.fn(() => Promise.resolve({
        statusCode: 0,
      })),
      getUserData: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
    };
    setup();
    inputValidUserData();
    submitForm();
    await Promise.resolve();
    expect(wrapper.find(Alert)).toHaveLength(1);
  });

  it('should render Alert when invalid user data is submitted', async () => {
    setup();
    inputInvalidUserData();
    submitForm();
    expect(wrapper.find(Alert)).toHaveLength(4);
  });
});
