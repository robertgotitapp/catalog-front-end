import React from 'react';
import { shallow } from 'enzyme';
import Alert from 'react-bootstrap/Alert';
import { SignInPage } from '../SignInPage';

describe('components/SignInPage', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      signIn: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      getUserData: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      history: { push: jest.fn() },
      loadCurrentUserData: jest.fn(),
    };
  });

  const setup = () => {
    wrapper = shallow(<SignInPage {...props} />);
  };

  const inputValidCredential = () => {
    wrapper.find('[name="username"]')
      .simulate('change',
        { target: { name: 'username', value: 'robert1' } });

    wrapper.find('[name="password"]')
      .simulate('change',
        { target: { name: 'password', value: 'Password1' } });
  };

  const inputInvalidCredential = () => {
    wrapper.find('[name="username"]')
      .simulate('change',
        { target: { name: 'username', value: 'rob1' } });

    wrapper.find('[name="password"]')
      .simulate('change',
        { target: { name: 'password', value: 'Pasd1' } });
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

  it('should trigger history push function when valid credentail is submitted', async () => {
    setup();
    inputValidCredential();
    submitForm();
    await Promise.resolve();
    await Promise.resolve();
    expect(props.history.push).toBeCalled();
  });

  it('should render Alert when invalid credential is submitted', async () => {
    setup();
    inputInvalidCredential();
    submitForm();
    expect(wrapper.find(Alert)).toHaveLength(1);
  });

  it('should display alerts if the request to api is failed', async () => {
    props = {
      signIn: jest.fn(() => Promise.resolve({
        statusCode: 0,
        errors: {
          description: 'Invalid Credential',
        },
      })),
      getUserData: jest.fn(() => Promise.resolve({
        statusCode: 0,
      })),
    };
    setup();
    inputValidCredential();
    submitForm();
    await Promise.resolve();
    expect(wrapper.find(Alert)).toHaveLength(1);
  });
});
