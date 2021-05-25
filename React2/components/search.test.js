import React from 'react';
import 'jest-styled-components';
import { shallow } from 'enzyme';

// helpers
import renderTestWithTheme from '../../HOC/render-test-with-theme'


// component under test
import Search from "./search";

// constants
const CONSTS = {
  fields: {
    search: 'fields.search'
  },
  buttons: {
    showOutfit: 'buttons.showOutfit'
  }
};

// snapshot tests
it('should render correctly with CONSTS and given value', () => {

  const Wrapper = renderTestWithTheme(
    <Search CONSTS={CONSTS} value={'12345'} buttonText={'my button'}/>
  );

  expect(Wrapper).toMatchSnapshot();
});


// enzyme tests
it('should call searchSetValue onClick', () => {
  // stub
  const mockClick = jest.fn();
  // build
  const Wrapper = shallow(<Search CONSTS={CONSTS} value={'12345'} searchSetValue={mockClick} buttonText={'my button'}/>);
  // change
  Wrapper.find('TextInput').simulate('change', {target:{value:'myvalue'}});
  // test
  expect(mockClick.mock.calls.length).toBe(1);
});

it('should call searchSetQuery onClick', () => {
  // stub
  const mockClick = jest.fn();
  // build
  const Wrapper = shallow(<Search CONSTS={CONSTS} value={'12345'} handleSearch={mockClick} buttonText={'my button'}/>);
  // change
  Wrapper.find('Button').simulate('click');
  // test
  expect(mockClick.mock.calls.length).toBe(1);
});

