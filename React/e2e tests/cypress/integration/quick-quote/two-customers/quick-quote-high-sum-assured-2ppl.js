import quickQuotePage from '../../../pages/1-quick-quote-page';
import quickQuoteResults from '../../../pages/2-quick-quote-results';

for (let i = 0; i < 20; i++) {
  quickQuotePage({
    sumAssured: '600000',
    secondCustomer: true
  });
  quickQuoteResults({
    expectedResults: {
      sumAssured: '600,000',
      payEachMonth: '48.43'
    }
  });
  quickQuotePage({
    sumAssured: '800000',
    secondCustomer: true
  });
  quickQuoteResults({
    expectedResults: {
      sumAssured: '800,000',
      payEachMonth: '37.21'
    }
  });
  quickQuotePage({
    sumAssured: '1000000',
    secondCustomer: true
  });
  quickQuoteResults({
    expectedResults: {
      sumAssured: '1,000,000',
      payEachMonth: '46.00'
    }
  });
  quickQuotePage({
    sumAssured: '1500000',
    secondCustomer: true
  });
  quickQuoteResults({
    expectedResults: {
      sumAssured: '1,500,000',
      payEachMonth: '67.99'
    }
  });
}
