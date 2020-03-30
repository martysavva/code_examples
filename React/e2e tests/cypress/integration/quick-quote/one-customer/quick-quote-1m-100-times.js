import quickQuotePage from '../../../pages/1-quick-quote-page';
import quickQuoteResults from '../../../pages/2-quick-quote-results';

for (let i = 0; i < 100; i++) {
  quickQuotePage({
    sumAssured: '1000000'
  });
  quickQuoteResults({
    expectedResults: {
      sumAssured: '1,000,000',
      payEachMonth: '46.00'
    }
  });
}
