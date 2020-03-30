/* Libs */
import React, {PropTypes} from 'react';
import Component from 'react-pure-render/component';
/* --- Libs */

/* Helpers */
import {generateStringFromTemplate} from '../../helpers/utils/';
/* --- Helpers */

/* Components */
import ContactDetailsForm from './components/contact-details-form/contact-details-form';
import PageFooter from '../../components/page-footer/page-footer';
import InfoContainer from '../../components/info-container/info-container';
import Paragraph from '../../components/paragraph/paragraph';
import MobileImportantInformation from '../../components/important-information/mobile-important-information';
import CheckboxInputContainer from '../../components/checkbox-input-container/checkbox-input-container';
/* --- Components */

/* Styles */
import './contact-details.scss';
/* --- Styles */

export default class ContactDetails extends Component {

  static propTypes = {
    App: PropTypes.object,
    Cover: PropTypes.object,
    Customers: PropTypes.object,
    actions: PropTypes.object,
    location: PropTypes.object,
    checkValidations: PropTypes.func.isRequired
  };

  static defaultProps = {
    App: {},
    Cover: {},
    Customers: {},
    actions: {},
    location: {}
  };


  setFirstPersonsAddress = () => {
    const {Customers: {customer1: {address}}} = this.props;
    const {actions} = this.props;
    actions.customerSetInfo({value: address, key: ['address'], customer: 'customer2'});
    // clear validations
    actions.setValidation({key: 'customer2.ADDRESS', isValid: true, validations: []});
  };

  setFirstPersonsContact = () => {
    const {Customers: {customer1: {contactNumber}}} = this.props;
    const {actions} = this.props;
    actions.customerSetInfo({value: contactNumber, key: ['contactNumber'], customer: 'customer2'});
  };

  setMarketingPreference = (val) => {
    const {actions} = this.props;
    actions.customerSetMarketingPreference(val);
  };

  getAddress = async (postcode, building, uniqKey) => {
    const {actions} = this.props;
    actions.customerSearchAddress(postcode, building, uniqKey, 'ADDRESS', ['address']);
  };

  toggleAddress = (key) => {
    const currentValue = this.props.Customers[key].address.addressOpen;
    const {actions} = this.props;
    actions.customerToggleAddress({key: [key, 'address', 'addressOpen'], value: !currentValue});
  };

  showAddressOpen = (key, value) => {
    const {actions} = this.props;
    actions.customerToggleAddress({key: [key, 'address', 'addressOpen'], value});
  };

  selectAddress = (value, uniqKey) => {
    const {Customers: {[uniqKey]: {address: {addressLookup}}}} = this.props;
    const addressToSet = addressLookup[value];
    const {actions} = this.props;
    actions.customerSetAddress(value, uniqKey, ['address'], addressToSet);
  };

  clearLookup = (uniqKey) => {
    const {actions} = this.props;
    const payload = {
      key: uniqKey,
      path: ['address']
    };
    actions.clearValidation(`${uniqKey}.ADDRESS`);
    actions.customerClearLookup(payload);
  };

  updateCustomerInformation = (value, key, customer) => {
    const {actions} = this.props;
    actions.customerSetInfo({customer, value, key});
  };

  saveAndContinue = () => {
    const {actions} = this.props;
    actions.setProcess({key: 'contactDetailsComplete', value: true});
    actions.increaseForceValidations();
    actions.customerSaveContactDetails();
  };

  render() {
    const {
      App: {
        validations,
        forceValidations,
        shouldScroll,
        process: {
          quoteIllustrationLoading,
          quickQuoteComplete
        },
        config: {applicationId, applicationOwner},
        CONSTS
      },
      Cover: {
        secondCustomer
      },
      Customers: {
        customer1,
        customer2,
          customer1: {
              title: c1Title,
              firstName: c1FirstName,
              lastName: c1LastName,
              contactNumber: c1ContactNumber,
              emailAddress: c1EmailAddress,
              maritalStatus: c1MaritalStatus,
              ukResident: c1UkResident,
              address: c1Address,
              address: {
                  houseNumber: c1HouseNumber,
                  street: c1Street,
                  town: c1Town,
                  postcode: c1Postcode,
                  county: c1County,
                  addressLookup: c1AddressLookup,
                  addressOpen: c1AddressOpen
              },
              otherTitleActive: c1OtherTitleActive
          },
          customer2: {
              title: c2Title,
              firstName: c2FirstName,
              lastName: c2LastName,
              contactNumber: c2ContactNumber,
              emailAddress: c2EmailAddress,
              maritalStatus: c2MaritalStatus,
              ukResident: c2UkResident,
              address: c2Address,
              address: {
                  houseNumber: c2HouseNumber,
                  street: c2Street,
                  town: c2Town,
                  postcode: c2Postcode,
                  county: c2County,
                  addressLookup: c2AddressLookup,
                  addressOpen: c2AddressOpen
              },
              otherTitleActive: c2OtherTitleActive
          },
          marketingPreference
        },
        checkValidations,
        location: {pathname},
        actions
      } = this.props;


    return (
      <section className='quick-quote-page'>
        <div>
          <h1>{generateStringFromTemplate(CONSTS.contactDetails.title, {name: c1FirstName})}</h1>

          <ContactDetailsForm
            title={c1Title}
            firstName={c1FirstName}
            firstCustomerFirstName={c1FirstName}
            lastName={c1LastName}
            contactNumber={c1ContactNumber}
            emailAddress={c1EmailAddress}
            maritalStatus={c1MaritalStatus}
            ukResident={c1UkResident}
            houseNumber={c1HouseNumber}
            address={c1Address}
            street={c1Street}
            town={c1Town}
            postcode={c1Postcode}
            county={c1County}
            addressOpen={c1AddressOpen}
            addressLookup={c1AddressLookup}
            selectAddress={this.selectAddress}
            clearLookup={() => this.clearLookup(CONSTS.Customer1)}
            updateCustomerInformation={this.updateCustomerInformation}
            toggleAddress={this.toggleAddress}
            uniqKey={CONSTS.Customer1}
            getAddress={this.getAddress}
            validations={validations}
            checkValidations={checkValidations}
            forceValidations={forceValidations}
            setValidation={this.props.actions.setValidation}
            clearValidation={this.props.actions.clearValidation}
            CONSTS={CONSTS}
            customer={customer1}
            showAddressOpen={this.showAddressOpen}
            customerSetCustomerOtherTitle={this.props.actions.customerSetCustomerOtherTitle}
            otherTitleActive={c1OtherTitleActive}
          />
        </div>
        <div>
          {secondCustomer &&
            <div>
              <h1>{generateStringFromTemplate(CONSTS.contactDetails.title, {name: c2FirstName})}</h1>
              <ContactDetailsForm
                title={c2Title}
                firstName={c2FirstName}
                firstCustomerFirstName={c1FirstName}
                lastName={c2LastName}
                contactNumber={c2ContactNumber}
                c1ContactNumber={c1ContactNumber}
                emailAddress={c2EmailAddress}
                maritalStatus={c2MaritalStatus}
                ukResident={c2UkResident}
                houseNumber={c2HouseNumber}
                street={c2Street}
                town={c2Town}
                postcode={c2Postcode}
                county={c2County}
                addressOpen={c2AddressOpen}
                addressLookup={c2AddressLookup}
                address={c2Address}
                selectAddress={this.selectAddress}
                setFirstPersonsAddress={this.setFirstPersonsAddress}
                setFirstPersonsContact={this.setFirstPersonsContact}
                clearLookup={() => this.clearLookup(CONSTS.Customer2)}
                toggleAddress={this.toggleAddress}
                updateCustomerInformation={this.updateCustomerInformation}
                getAddress={this.getAddress}
                uniqKey={CONSTS.Customer2}
                checkFirstName={this.checkFirstName}
                checkLastName={this.checkLastName}
                checkContactNumber={this.checkContactNumber}
                checkEmailAddress={this.checkEmailAddress}
                checkUkResident={this.checkUkResident}
                checkNotNull={this.checkNotNull}
                validations={validations}
                checkValidations={checkValidations}
                forceValidations={forceValidations}
                CONSTS={CONSTS}
                secondCustomer={secondCustomer}
                customer={customer2}
                clearValidation={this.props.actions.clearValidation}
                setValidation={this.props.actions.setValidation}
                showAddressOpen={this.showAddressOpen}
                customerSetCustomerOtherTitle={this.props.actions.customerSetCustomerOtherTitle}
                otherTitleActive={c2OtherTitleActive}
              />
            </div>
          }
        </div>
        <section className={'marketing-rules'}>
          <InfoContainer>
            <span className={'icon icon-lock green-padlock'} />
            <Paragraph text={CONSTS.contactDetails.marketingRules} />
          </InfoContainer>
        </section>

        <CheckboxInputContainer
          highlighted
          fullWidth
          onChange={this.setMarketingPreference}
          isChecked={marketingPreference}
          size={'large'}
        >
          <p><strong>{CONSTS.contactDetails.marketingInfo}</strong></p>
        </CheckboxInputContainer>
        <section className={'disclosure'}>
          <Paragraph text={CONSTS.contactDetails.disclosure1} />
          <Paragraph text={CONSTS.contactDetails.disclosure2} html />
        </section>

        <MobileImportantInformation
          quoteRef={applicationId}
          CONSTS={CONSTS}
          applicationOwner={applicationOwner}
          lifeSearchNumbers={CONSTS.lifeSearchNumbers}
          path={pathname}
          getQuoteIllustrationDocument={actions.coverGetQuoteIllustrationDocument}
          quoteIllustrationLoading={quoteIllustrationLoading}
          quickQuoteComplete={quickQuoteComplete}
        />

        <PageFooter
          onSave={this.props.actions.setSavePopOver}
          onNext={this.saveAndContinue}
          onBack={() => actions.navigateToScreen('quick-quote-summary')}
          currentValidations={validations}
          validConditionals={[
            'customer1.FIRST_NAME',
            'customer1.LAST_NAME',
            'customer1.CONTACT_NUMBER',
            'customer1.EMAIL_ADDRESS',
            'customer1.UK_RESIDENT',
            'customer1.title',
            'customer1.maritalStatus',
            'customer1.ADDRESS',
            'customer2.FIRST_NAME',
            'customer2.LAST_NAME',
            'customer2.CONTACT_NUMBER',
            'customer2.EMAIL_ADDRESS',
            'customer2.UK_RESIDENT',
            'customer2.title',
            'customer2.maritalStatus',
            'customer2.ADDRESS'
          ]}
          secondCustomer={secondCustomer}
          backVisible
          saveVisible
          setShouldScroll={this.props.actions.setShouldScroll}
          shouldScroll={shouldScroll}
          validatePage={this.props.actions.validatePage}
          isValid={this.props.actions.isItValid}
        />
      </section>

    );
  }
}
