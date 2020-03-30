/* eslint-disable */
/* Libs */
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
/* --- Libs */

/* Component */
import AddressManual from './address-manual';
import TextInput from '../../../../components/text-input/text-input';
/* --- Component */

describe('RC: AddressManual', () => {

  const wrapper = shallow((
    <AddressManual />
  ));


  //tests
  it('Diplays 5 TextInput Components', () => {
    expect(wrapper.find(TextInput)).to.have.length(5);
  });
});