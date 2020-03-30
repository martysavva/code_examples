
/* eslint-disable */
/* Libs */
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
/* --- Libs */

/* Component */
import Address from './address';
import AddressAuto from './components/address-auto/address-auto';
import AddressManual from './components/address-manual/address-manual';
import Anchor from '../../components/anchor/anchor';
import Button from '../../components/button/button';
/* --- Component */

describe('RC: Address', () => {

  let manualText = 'manual';
  let autoText   = 'auto';
  let validations = {
    'customer1.POST_CODE': {
      valid: true,
      validations: [
        {
          valid: true,
          msg: 'cant be empty',
          rule: {
            type: 'notNull',
            msg: 'notNull'
          }
        }
      ]
    }
  }

  let wrapper1 = shallow((
    <Address addressOpen={true} textManual={manualText} textAuto={autoText} uniqKey={'customer1'} validations={validations} />
  ));

  let wrapper2 = shallow((
    <Address addressOpen={false} textManual={manualText} textAuto={autoText} uniqKey={'customer1'} validations={validations} />
  ));

  //tests
  it('Diplays AddressManual if addressOpen=true', () => {
    expect(wrapper1.find(AddressManual)).to.have.length(1);
  });

  it('Does not display AddressAuto if addressOpen=true', () => {
    expect(wrapper1.find(AddressAuto)).to.have.length(0);
  });

  it('Diplays AddressAuto if addressOpen=false', () => {
    expect(wrapper2.find(AddressAuto)).to.have.length(1);
  });

  it('Does not display AddressManual if addressOpen=false', () => {
    expect(wrapper2.find(AddressManual)).to.have.length(0);
  });

  it('Populates Anchor prop \'text\' with prop textManual if addressOpen=true', () => {
    const AnchorWrapper = wrapper1.find(Button);
    expect(AnchorWrapper.props().text).to.equal(manualText);
  });

  it('Populates Anchor prop \'text\' with prop textAuto if addressOpen=false', () => {
    const AnchorWrapper = wrapper2.find(Anchor);
    expect(AnchorWrapper.props().text).to.equal(autoText);
  });

});

