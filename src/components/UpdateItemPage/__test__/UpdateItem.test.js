import React from 'react';
import { shallow } from 'enzyme';
import Alert from 'react-bootstrap/Alert';
import { UpdateItem } from '../UpdateItem';

describe('components/UpdateItem', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      item: {
        category_id: 1,
        created: '2019-06-17T13:49:00+00:00',
        description: 'Item 4',
        id: 11,
        name: 'Item 4',
        price: 19,
        updated: '2019-06-17T13:49:00+00:00',
      },
      currentCategory: {
        created: '2019-06-17T13:46:18+00:00',
        description: 'Laptop',
        id: 1,
        name: 'Laptop',
        updated: '2019-06-17T13:46:18+00:00',
      },
      updateItem: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
    };
  });

  const setup = () => {
    wrapper = shallow(<UpdateItem {...props} />);
  };

  const inputValidItemDetail = () => {
    wrapper.find('[name="name"]')
      .simulate('change',
        { target: { name: 'name', value: 'Test Item 1' } });

    wrapper.find('[name="description"]')
      .simulate('change',
        { target: { name: 'description', value: 'Test Item 1' } });

    wrapper.find('[name="price"]')
      .simulate('change',
        { target: { name: 'price', value: 10 } });
  };

  const inputInvalidItemDetail = () => {
    wrapper.find('[name="name"]')
      .simulate('change',
        { target: { name: 'name', value: 'Test' } });

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

    wrapper.find('[name="price"]')
      .simulate('change',
        { target: { name: 'price', value: -10 } });
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
    const itemNameInput = wrapper.find('[name="name"]');
    itemNameInput.simulate('change', { target: { name: 'name', value: 'item 1' } });
    expect(wrapper.state().name).toEqual('item 1');
  });

  it('should trigger state change when FormControl description got input', () => {
    const itemDescriptionInput = wrapper.find('[name="description"]');
    itemDescriptionInput.simulate('change', { target: { name: 'description', value: 'description' } });
    expect(wrapper.state().description).toEqual('description');
  });

  it('should trigger state change when FormControl price got input', () => {
    const itemPriceInput = wrapper.find('[name="price"]');
    itemPriceInput.simulate('change', { target: { name: 'price', value: 100 } });
    expect(wrapper.state().price).toEqual(100);
  });

  it('should change state toHome to true when valid item detail is submitted', async () => {
    setup();
    inputValidItemDetail();
    submitForm();
    await Promise.resolve();
    expect(wrapper.state().toHome).toEqual(true);
  });

  it('should render Alert when invalid item detail is submitted', async () => {
    setup();
    inputInvalidItemDetail();
    submitForm();
    expect(wrapper.find(Alert)).toHaveLength(3);
  });

  it('should display alerts if the request to api is failed', async () => {
    props = {
      item: {
        category_id: 1,
        created: '2019-06-17T13:49:00+00:00',
        description: 'Item 4',
        id: 11,
        name: 'Item 4',
        price: 19,
        updated: '2019-06-17T13:49:00+00:00',
      },
      currentCategory: {
        created: '2019-06-17T13:46:18+00:00',
        description: 'Laptop',
        id: 1,
        name: 'Laptop',
        updated: '2019-06-17T13:46:18+00:00',
      },
      updateItem: jest.fn(() => Promise.resolve({
        statusCode: 0,
        errorPromise: Promise.resolve({
          message: {
            name: 'Item name has to be at least 5 characters',
          },
        }),
      })),
    };
    setup();
    inputValidItemDetail();
    submitForm();
    await Promise.resolve();
    await Promise.resolve();
    expect(wrapper.find(Alert)).toHaveLength(1);
  });
});
