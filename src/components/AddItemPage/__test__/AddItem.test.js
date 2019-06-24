import React from 'react';
import { shallow } from 'enzyme';
import Alert from 'react-bootstrap/Alert';
import { AddItem } from '../AddItem';

describe('components/AddItem', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      categoryIds: [1, 2, 3, 4],
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
        4: {
          created: '2019-06-17T13:47:17+00:00',
          description: 'Vehicle',
          id: 4,
          name: 'Vehicle',
          updated: '2019-06-17T13:47:17+00:00',
        },
      },
      addItem: jest.fn(() => Promise.resolve({
        statusCode: 1,
      })),
      history: { push: jest.fn() },
    };
  });

  const setup = () => {
    wrapper = shallow(<AddItem {...props} />);
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
    setup();
    const itemNameInput = wrapper.find('[name="name"]');
    itemNameInput.simulate('change', { target: { name: 'name', value: 'item 1' } });
    expect(wrapper.state().name).toEqual('item 1');
  });

  it('should trigger state change when FormControl description got input', () => {
    setup();
    const itemDescriptionInput = wrapper.find('[name="description"]');
    itemDescriptionInput.simulate('change', { target: { name: 'description', value: 'description' } });
    expect(wrapper.state().description).toEqual('description');
  });

  it('should trigger state change when FormControl price got input', () => {
    setup();
    const itemPriceInput = wrapper.find('[name="price"]');
    itemPriceInput.simulate('change', { target: { name: 'price', value: 100 } });
    expect(wrapper.state().price).toEqual(100);
  });

  it('should trigger state change when selectCategory function got input', () => {
    setup();
    wrapper.instance().selectCategory({
      preventDefault: jest.fn(),
      target: { name: 'selectCategory', value: 2 },
    });
    expect(wrapper.state().selectedCategory).toEqual(2);
  });

  it('should trigger history push function when valid item detail is submitted', async () => {
    setup();
    inputValidItemDetail();
    submitForm();
    await Promise.resolve();
    expect(props.history.push).toBeCalled();
  });


  it('should render Alert when invalid item detail is submitted', async () => {
    setup();
    inputInvalidItemDetail();
    submitForm();
    expect(wrapper.find(Alert)).toHaveLength(3);
  });

  it('should display alerts if the request to api is failed', async () => {
    props = {
      categoryIds: [1, 2, 3, 4],
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
        4: {
          created: '2019-06-17T13:47:17+00:00',
          description: 'Vehicle',
          id: 4,
          name: 'Vehicle',
          updated: '2019-06-17T13:47:17+00:00',
        },
      },
      addItem: jest.fn(() => Promise.resolve({
        statusCode: 0,
        errors: {
          message: {
            name: 'Item name has to be at least 5 characters',
          },
        },
      })),
    };
    setup();
    inputValidItemDetail();
    submitForm();
    await Promise.resolve();
    expect(wrapper.find(Alert)).toHaveLength(1);
  });
});
