import quickQuotePage from '../../../pages/1-quick-quote-page';
import quickQuoteResults from '../../../pages/2-quick-quote-results';


quickQuotePage({
  sumAssured: '1000000',
  secondCustomer: true,
  customer2: {
    firstName: 'Jane',
    dateOfBirth: {
      day: '01',
      month: '12',
      year: '1986'
    }
  }
});
quickQuoteResults({
  expectedResults: {
    sumAssured: '1,000,000',
    payEachMonth: '64.84'
  }
});
