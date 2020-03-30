import quickQuotePage from '../../../pages/1-quick-quote-page';
import quickQuotePageReentry from '../../../pages/1-quick-quote-page-reentry';
import quickQuoteResults from '../../../pages/2-quick-quote-results';
import backButton from '../../../utils/click-back-button';

quickQuotePage({
  sumAssured: '100000',
  coverLength: '10',
  customer1: {
    dateOfBirth: {
      day: '01',
      month: '01',
      year: '1970'
    }
  }
});
quickQuoteResults({
  expectedResults: {
    sumAssured: '100,000',
    payEachMonth: '11.39'
  }
});
backButton();
quickQuotePageReentry({
  coverLength: '30',
  customer1: {
    dateOfBirth: {
      day: '01',
      month: '01',
      year: '1970'
    }
  }
});
quickQuoteResults({
  expectedResults: {
    sumAssured: '100,000',
    payEachMonth: '22.70',
    ciAvailable: false
  }
});
