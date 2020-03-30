/*
TestId: 1
Pages Tested: [Quick Quote, Contact, Retrieve Quote]
Description: This test will go through the initial quick quote page, then choose a term product, then enter the contact details, then save the application, and reload it
*/

import config from '../../support/config';

import quickQuotePage from '../../pages/1-quick-quote-page';
import quickQuoteResults from '../../pages/2-quick-quote-results';
import contactDetailsPage from '../../pages/3-contact-details';

import saveApplicationWithNoEmail from '../../utils/save-application-no-email';
import retrieveApplication from '../../utils/load-application';
import clickReOpenLink from '../../utils/click-re-open-link';

const returnUrl = `${config.testUrls[config.activeEnv]}/declaration`;

quickQuotePage({
  sumAssured: '100000'
});
quickQuoteResults({shouldNavigate: true});
contactDetailsPage(false);
saveApplicationWithNoEmail();
clickReOpenLink();
retrieveApplication({
  pw: 'Asdf123!',
  returnUrl
});
