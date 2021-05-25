import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import 'jest-styled-components';
import Adapter from 'enzyme-adapter-react-16';

// helpers
import renderTestWithTheme from "../../HOC/render-test-with-theme";

// component under test
import Paging from "./paging";

configure({ adapter: new Adapter() });


// snapshot tests
it('renders correct number of buttons', () => {
  // stub
  const mockMethod = jest.fn();

  // build
  const Wrapper = renderTestWithTheme(
    <Paging numberOfPages={6} setPage={mockMethod}/>
  );
  // test
  expect(Wrapper).toMatchSnapshot();
});



// enzyme tests
it('should render first child as active', () => {
  // stub
  const mockMethod = jest.fn();
  // build
  const Wrapper = shallow(<Paging numberOfPages={6} setPage={mockMethod}/>);
  const activeButton = Wrapper.childAt(0);
  // test
  expect(activeButton.prop('isActive')).toEqual(true);
});

it('should render third child as active', () => {
  // build
  const Wrapper = mount(<Paging numberOfPages={6} setPage={()=>{}}/>);
  // click third button
  Wrapper.find('PagingButton').at(2).simulate('click');
  // get third button
  const thirdButton = Wrapper.find('PagingButton').at(2);
  // test
  expect(thirdButton.prop('isActive')).toEqual(true);
});

it('should fire callback when clicking a button', () => {
  // stub
  const mockMethod = jest.fn();
  // initial build
  const Wrapper = shallow(<Paging numberOfPages={6} setPage={mockMethod}/>);
  // locate third button
  const thirdButton = Wrapper.childAt(2);
  // click third button
  thirdButton.simulate('click');
  // test
  expect(mockMethod.mock.calls.length).toBe(1);
});

it('should render nothing if there is only 1 page', () => {
  // stub
  const mockMethod = jest.fn();
  // initial build
  const Wrapper = shallow(<Paging numberOfPages={1} setPage={mockMethod}/>);
  // test
  expect(Wrapper.find('PagingButton').length).toEqual(0)
});

it('should render correct number of buttons', () => {
  // build
  const Wrapper = shallow(<Paging numberOfPages={34} setPage={()=>{}}/>);
  // get number of children
  const numberOfButtons = Wrapper.children().length;
  // test
  expect(numberOfButtons).toEqual(34);
});




