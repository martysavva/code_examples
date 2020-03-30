/* Libs */
import React from 'react';
import PropTypes from 'prop-types';
/* --- Libs */

/* Components */
import DecisionBox from '../decision-box/decision-box';
import DecisionExplanationBox from '../decision-explanation-box/decision-explanation-box';
import CoverSummary from '../cover-summary/cover-summary';
/* --- Components */

/* Helpers */
import * as DecisionHelpers from '../../helpers/decision.helper';
/* ---Helpers */

const NonStandardDecision = ({
                                CONSTS,
                                className,
                                underwrittenQuote,
                                quickQuote,
                                lifeValue,
                                customerCount,
                                customer1Name,
                                customer2Name,
                                customer1Id,
                                customer2Id,
                                decisionDetails,
                                additionalCover,
                                coverLength,
                                coverType
}) => {
  // 1. determine if underwritten cost is higher than quickquote
  const isLoaded = underwrittenQuote.lifetime > quickQuote.lifetime;
  // 2. determine whether there are any decision exclusions
  const cust1Exclusions = DecisionHelpers.getDecisionSummary(decisionDetails, CONSTS.serverParams.NON_STANDARD, 'componentExclusions', customer1Id);
  const cust2Exclusions = DecisionHelpers.getDecisionSummary(decisionDetails, CONSTS.serverParams.NON_STANDARD, 'componentExclusions', customer2Id);
  const isExcluded = !!Array.from(new Set([...cust1Exclusions, ...cust2Exclusions])).length;
  let customer1Decisions = [];
  let customer2Decisions = [];

  // determine text based on whether quote is loaded or has exclusions
  // @todo - move all text to consts
  let text1 = '';
  let text2 = '';
  let title4 = '';
  if (isLoaded && isExcluded) {
    text1 = 'We are able to offer you cover but the premium originally quoted has gone up and certain conditions won\'t be covered under Critical Illness.';
    text2 = 'The decision is due to the following';
    title4 = 'We will offer you cover with the increased premium and the following exclusion';
    // get required decisions
    const loadedCustomer1 = DecisionHelpers.getDeepDecisions(decisionDetails, CONSTS.serverParams.NON_STANDARD, customer1Id);
    const loadedCustomer2 = customerCount === 2 ? DecisionHelpers.getDeepDecisions(decisionDetails, CONSTS.serverParams.NON_STANDARD, customer2Id) : [];
    const exclusionsCustomer1 = DecisionHelpers.getDeepDecisions(decisionDetails, CONSTS.serverParams.NON_STANDARD, customer1Id);
    const exclusionsCustomer2 = customerCount === 2 ? DecisionHelpers.getDeepDecisions(decisionDetails, CONSTS.serverParams.NON_STANDARD, customer2Id) : [];
    // remove duplicates and assign to decisions arrays
    customer1Decisions = Array.from(new Set([...loadedCustomer1, ...exclusionsCustomer1]));
    customer2Decisions = Array.from(new Set([...loadedCustomer2, ...exclusionsCustomer2]));
  } else {
    if (isLoaded) {
      text1 = 'We are able to offer you cover but the premium that you were originally quoted has gone up.';
      text2 = 'Based on the information you\'ve given us, we have increased your premium due to the following:';
      title4 = 'We\'ll offer you cover at the new increased premium';
      customer1Decisions = DecisionHelpers.getDeepDecisions(decisionDetails, CONSTS.serverParams.NON_STANDARD, customer1Id);
      customer2Decisions = customerCount === 2 ? DecisionHelpers.getDeepDecisions(decisionDetails, CONSTS.serverParams.NON_STANDARD, customer2Id) : [];
    }

    if (isExcluded) {
      text1 = 'We are able to offer you cover but certain conditions won\'t be covered by the Life and Critical Illness policy.';
      text2 = 'We aren\'t able to cover you for the following reasons:';
      title4 = 'We\'ll offer you cover with the exclusion of';
      customer1Decisions = DecisionHelpers.getDeepDecisions(decisionDetails, CONSTS.serverParams.NON_STANDARD, customer1Id);
      customer2Decisions = customerCount === 2 ? DecisionHelpers.getDeepDecisions(decisionDetails, CONSTS.serverParams.NON_STANDARD, customer2Id) : [];
    }
  }

  const customer1Text4 = DecisionHelpers.getDecisionSummary(decisionDetails, CONSTS.serverParams.NON_STANDARD, 'componentExclusions', customer1Id);
  const customer2Text4 = DecisionHelpers.getDecisionSummary(decisionDetails, CONSTS.serverParams.NON_STANDARD, 'componentExclusions', customer2Id);
  return (
    <div>
      <DecisionBox
        CONSTS={CONSTS}
        type={CONSTS.serverParams.NON_STANDARD}
        text={'Your cover has been accepted on special terms'}
      />
      <DecisionExplanationBox
        CONSTS={CONSTS}
        type={CONSTS.serverParams.NON_STANDARD}
        className={className}
        customerCount={customerCount}
        customer1Name={customer1Name}
        customer2Name={customer2Name}
        title1={'What does \'special terms\' mean?'}
        text1={text1}
        title2={'Why has this decision been made?'}
        text2={text2}
        customer1Decisions={customer1Decisions}
        customer2Decisions={customer2Decisions}
        title3={'What happens next?'}
        title4={title4}
        customer1Text4={customer1Text4}
        customer2Text4={customer2Text4}
        isLoadedOnly={isLoaded && !isExcluded}

      />
      <CoverSummary
        CONSTS={CONSTS}
        lifeValue={lifeValue}
        monthlyCost={underwrittenQuote.monthlyCost}
        coverCovered={customerCount}
        additionalCover={additionalCover}
        coverLength={coverLength}
        coverType={coverType}
      />
    </div>
  );
};

// todo: create props and default props

NonStandardDecision.propTypes = {
  decisionDetails: PropTypes.object.isRequired
};

export default NonStandardDecision;
