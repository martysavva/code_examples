import quickQuotePage from '../../../pages/1-quick-quote-page';
import quickQuoteResults from '../../../pages/2-quick-quote-results';


const amounts = [
  '100000',
  '120000',
  '300000',
  '450000',
  '500000',
  '600000',
  '850000',
  '1000000',
  '1250000',
  '1500000'
];


quickQuotePage({
  sumAssured: amounts[0]
});
quickQuoteResults();

quickQuotePage({
  sumAssured: amounts[1]
});
quickQuoteResults();

quickQuotePage({
  sumAssured: amounts[2]
});
quickQuoteResults();

quickQuotePage({
  sumAssured: amounts[3]
});
quickQuoteResults();

quickQuotePage({
  sumAssured: amounts[4]
});
quickQuoteResults();

quickQuotePage({
  sumAssured: amounts[5]
});
quickQuoteResults();

quickQuotePage({
  sumAssured: amounts[6]
});
quickQuoteResults();

quickQuotePage({
  sumAssured: amounts[7]
});
quickQuoteResults();

quickQuotePage({
  sumAssured: amounts[8]
});
quickQuoteResults();

quickQuotePage({
  sumAssured: amounts[9]
});
quickQuoteResults();
