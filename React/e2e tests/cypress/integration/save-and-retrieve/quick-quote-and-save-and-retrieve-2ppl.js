import config from '../../support/config';

import quickQuotePage from '../../pages/1-quick-quote-page';
import saveApplicationWithEmail from '../../utils/save-application-with-email';
import retrieveApplication from '../../utils/load-application';
import clickReOpenLink from '../../utils/click-re-open-link';

const returnUrl = `${config.testUrls[config.activeEnv]}/your-quick-quote`;

const state = {
  sumAssured: '150000',
  secondCustomer: true
};

quickQuotePage(state);
saveApplicationWithEmail(state);
clickReOpenLink(state);
retrieveApplication({
  pw: 'Asdf123!',
  returnUrl
});
