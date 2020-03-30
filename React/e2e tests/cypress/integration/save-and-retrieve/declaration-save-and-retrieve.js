import config from '../../support/config';

import quickQuotePage from '../../pages/1-quick-quote-page';
import quickQuoteResults from '../../pages/2-quick-quote-results';
import contactDetailsPage from '../../pages/3-contact-details';

import saveApplicationWithNoEmail from '../../utils/save-application-no-email';
import retrieveApplication from '../../utils/load-application';
import clickReOpenLink from '../../utils/click-re-open-link';
import declarationPage from '../../pages/4-declaration-page';


const returnUrl = `${config.testUrls[config.activeEnv]}/underwriting/customer1/personal-details`;
const setup = {shouldNavigate: true};

quickQuotePage(setup);
quickQuoteResults(setup);
contactDetailsPage(setup);
declarationPage(setup);
saveApplicationWithNoEmail(setup);
clickReOpenLink(setup);
retrieveApplication({
  pw: 'Asdf123!',
  returnUrl
});
