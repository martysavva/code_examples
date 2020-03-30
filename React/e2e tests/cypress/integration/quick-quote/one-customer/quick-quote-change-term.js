import quickQuotePage from '../../../pages/1-quick-quote-page';
import quickQuotePageReentry from '../../../pages/1-quick-quote-page-reentry';
import quickQuoteResults from '../../../pages/2-quick-quote-results';
import backButton from '../../../utils/click-back-button';

quickQuotePage({
  sumAssured: '100000',
  coverLength: '10'
});
quickQuoteResults({
  expectedResults: {
    sumAssured: '100,000',
    payEachMonth: '7.02'
  }
});
backButton();
quickQuotePageReentry({
  coverLength: '15'
});
quickQuoteResults({
  expectedResults: {
    sumAssured: '100,000',
    payEachMonth: '7.14'
  }
});
