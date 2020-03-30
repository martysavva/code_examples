import quickQuotePage from '../../../pages/1-quick-quote-page';
import quickQuoteResults from '../../../pages/2-quick-quote-results';

quickQuotePage({
  sumAssured: '1500000'
});
quickQuoteResults({
  expectedResults: {
    sumAssured: '1,500,000',
    payEachMonth: '67.99'
  }
});
