import quickQuotePage from '../../../pages/1-quick-quote-page';
import quickQuotePageReentry from '../../../pages/1-quick-quote-page-reentry';
import quickQuoteResults from '../../../pages/2-quick-quote-results';
import backButton from '../../../utils/click-back-button';

quickQuotePage({
  sumAssured: '100000',
  coverLength: '40',
  customer1: {
    dateOfBirth: {
      day: '01',
      month: '01',
      year: '2001'
    }
  }
});
quickQuoteResults({
  expectedResults: {
    sumAssured: '100,000',
    payEachMonth: '5.95'
  },
  ciAvailable: true
});
backButton();
quickQuotePageReentry({
  coverLength: '45',
  customer1: {
    dateOfBirth: {
      day: '01',
      month: '01',
      year: '2001'
    }
  }
});
quickQuoteResults({
  expectedResults: {
    sumAssured: '100,000',
    payEachMonth: '6.17'
  },
  ciAvailable: false
});
