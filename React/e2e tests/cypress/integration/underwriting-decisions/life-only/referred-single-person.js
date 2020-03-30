import config from '../../../support/config';

import quickQuotePage from '../../../pages/1-quick-quote-page';
import quickQuoteResults from '../../../pages/2-quick-quote-results';
import contactDetailsPage from '../../../pages/3-contact-details';
import declarationPage from '../../../pages/4-declaration-page';
import uwqPersonalDetails from '../../../pages/5-uwq-personal-details';
import lastFiveYears from '../../../pages/6-last-five-years';
import haveYouEverHad from '../../../pages/7-have-you-ever-had';
import recentHealth from '../../../pages/8-recent-health';
import lifestyle from '../../../pages/9-lifestyle';
import lifestyleContinued from '../../../pages/10-lifestyle-continued';
import yourOccupation from '../../../pages/11-your-occupation';
import selectedCondition from '../../../pages/12-selected-condition';
import referredDecision from '../../../pages/decisions/single-person-referred';
// import applicationSummary from '../pages/12-application-summary';

const setup = {
  sumAssured: '100000',
  coverLength: '10',
  secondCustomer: false,
  customer1: false, // to contain specific customer data
  customer2: false, // to contain specific customer data
  decision: config.decision.REFER
};

quickQuotePage(setup);
quickQuoteResults(setup);
contactDetailsPage(setup);
declarationPage(setup);
uwqPersonalDetails(setup);
lastFiveYears(setup);
haveYouEverHad(setup);
recentHealth(setup);
lifestyle(setup);
lifestyleContinued(setup);
yourOccupation(setup);
selectedCondition(setup);
referredDecision(setup);
// applicationSummary();
