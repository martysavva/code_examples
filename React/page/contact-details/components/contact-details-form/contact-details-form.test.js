/* eslint-disable */

/* Libs */
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
/* --- Libs */

/* Component */
import ContactDetailForm from "./contact-details-form";
import InputContainer from '../../../../components/input-container/input-container';
import TextInput from '../../../../components/text-input/text-input';
import ButtonRadioGroup from '../../../../components/button-radio-group/button-radio-group';
import Address from '../../../../components/address/address';
import CustomSelect from '../../../../components/custom-select/custom-select';
/* --- Component */


describe('RC: ContactDetailForm', () => {

  const CONSTS = {
    global: {
      your: 'your',
      their: 'their'
    },
    contactDetails: {
      title: '${name} name',
      personTitle: 'personTitle',
      titleOptions: [
        {
          text: 'please select',
          value: null
        }
      ],
      firstName: '${prefix} firstName',
      lastName: '${prefix} lastName',
      contactNumber: '${prefix} contactNumber',
      emailAddress: '${prefix} emailAddress',
      maritalStatus: '${prefix} maritalStatus',
      ukResident: '${prefix} ukResident',
      address: '${prefix} address'
    },
    addressField: {
      textAuto: 'textAuto'
    }
  };

  const c1 = {
    id: '18367',
    enquiryId: '0eac1672-9c16-44d9-abbc-7dcb1313300c',
    title: 'Mr',
    firstName: 'asdf',
    lastName: 'asdf',
    dateOfBirth: {
      day: '1',
      month: '1',
      year: '1980'
    },
    gender: 'female',
    smoker: false,
    primary: null,
    contactNumber: '01988787667',
    emailAddress: 'asdf@asdf.com',
    maritalStatus: 'Married',
    ukResident: true,
    occupation: 'unknown',
    telephoneNumber: null,
    address: {
      line1: '1 Earlston Grove',
      houseNumber: '111',
      street: 'Earlston Grove',
      town: 'London',
      county: '',
      postcode: 'E9 7NE',
      addressOpen: true
    },
    doctor: {
      name: null,
      surgeryName: null,
      surgeryContactNumber: null,
      address: {
        houseNumber: null,
        street: null,
        town: null,
        postcode: null,
        country: null,
        addressLookup: null,
        addressOpen: false
      }
    }
  };

  const wrapper = shallow((
    <ContactDetailForm customer={c1} CONSTS={CONSTS} uniqKey={'Customer1'} secondCustomer={false} />
  ));

  it('Contains correct number of form elements', () => {
    expect(wrapper.find(InputContainer)).to.have.length(8);
  });

  it('Contains an address element', () => {
    expect(wrapper.find(Address)).to.have.length(1);
  });

  it('Contains a button radio group', () => {
    expect(wrapper.find(ButtonRadioGroup)).to.have.length(1);
  });

  it('Contains correct number of select objects', () => {
    expect(wrapper.find(CustomSelect)).to.have.length(2);
  });

  it('Contains correct number of input objects', () => {
    expect(wrapper.find(TextInput)).to.have.length(4);
  });

  //@todo [martysavva 01/08/17] - test prefix and innerprefix render correctly
});
