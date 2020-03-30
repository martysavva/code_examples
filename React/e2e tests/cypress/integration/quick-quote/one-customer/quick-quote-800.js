import quickQuotePage from '../../../pages/1-quick-quote-page';
import quickQuoteResults from '../../../pages/2-quick-quote-results';


quickQuotePage({
  sumAssured: '800000'
});
quickQuoteResults({
  expectedResults: {
    sumAssured: '800,000',
    payEachMonth: '46.00'
  }
});
