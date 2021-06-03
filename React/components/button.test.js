import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import 'jest-styled-components';
import Adapter from 'enzyme-adapter-react-16';



import Button from "./button";

Enzyme.configure({ adapter: new Adapter() });


// snapshot tests
it('renders text correctly', () => {
  const tree = renderer.create(<Button text={'Save'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly if disabled', () => {
  const tree = renderer.create(<Button text={'Save'} disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with className', () => {
  const tree = renderer.create(<Button text={'Save'} className={'my-class'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with supplied width', () => {
  const tree = renderer.create(<Button text={'Save'} width={'150px'} />).toJSON();
  expect(tree).toMatchSnapshot();
});


// enzyme tests
it('should call function onClick', () => {
  // stub
  const onAnchorClick = jest.fn();
  // build
  const Wrapper = shallow(<Button text={'Save'} onClick={onAnchorClick}/>);
  // click
  Wrapper.find('Primary').simulate('click');
  // test
  expect(onAnchorClick.mock.calls.length).toBe(1);
});

it('should render text', () => {
  const Wrapper = shallow(<Button text={'Save'} />);
  expect(Wrapper.find('Primary').children().text()).toEqual('Save')
});

it('should render primary button', () => {
  const Wrapper = shallow(<Button text={'Save'} />);
  expect(Wrapper.find('Primary')).toHaveLength(1)
});

it('should render secondary button', () => {
  const Wrapper = shallow(<Button text={'Save'} buttonType={'secondary'} />);
  expect(Wrapper.find('Secondary')).toHaveLength(1)
});

