/* eslint-disable */
/* Libs */
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
/* --- Libs */

/* Component */
import AddressAuto from './address-auto';
import TextInput from '../../../../components/text-input/text-input';
/* --- Component */

describe('RC: AddressAuto', () => {

  const wrapper = shallow((
    <AddressAuto />
  ));


  //tests
  it('Diplays 2 TextInput Components', () => {
    expect(wrapper.find(TextInput)).to.have.length(2);
  });
});
