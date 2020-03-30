import quickQuotePage from '../../../pages/1-quick-quote-page';
import quickQuoteResults from '../../../pages/2-quick-quote-results';

for (let i = 0; i < 20; i++) {
  quickQuotePage({
    sumAssured: '100000'
  });
  quickQuoteResults({
    expectedResults: {
      sumAssured: '100,000',
      payEachMonth: '7.02'
    }
  });
}
