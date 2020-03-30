/* eslint-disable */
/* Libs */
import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
/* --- Libs */

/* Component */
import NonStandardDecision from "./non-standard-decision";
import DecisionBox from '../../components/decision-box/decision-box';
import DecisionExplanationBox from '../decision-explanation-box/decision-explanation-box';
import CoverSummary from '../../components/cover-summary/cover-summary';
/* --- Component */

describe('RC: NonStandard', () => {

  //setup
  const CONSTS = {
    serverParams: {
      NON_STANDARD: "non_standard"
    }
  };
  const className = 'myClassName';
  const underwrittenQuote = {
    monthlyCost: '12',
    lifetime: 8000
  };
  const quickQuote = {
    lifetime: 6000
  };
  const lifeValue = '120000';
  const customerCount = 1;
  const additionalCover = {};
  const coverLength = '12';
  const coverType = 'level';
  const customer1Name = 'Marty Savva';
  const customer2Name = '';
  const customer1Id = '1111';
  const customer2Id = '2222';
  const decisionDetails = [
    {
      "id":"liverpoolvictoria|1aa16b90-66e4-49c6-97bb-faecedd8d3a2|liverpoolvictoria-term-level-1|00",
      "provider":"LiverpoolVictoria",
      "externalProductVariantId":103,
      "decision":{
        "type":"NON_STANDARD",
        "details":[
          {
            "customer":{
              "id":"1111",
              "name":"Marty",
              "surname":"Savva",
              "title":"Mr",
              "gender":"MALE",
              "atRiskOfSmoking":false,
              "enquiryClosed":false
            },
            "decisions":[
              {
                "type":"NON_STANDARD",
                "componentType":"LIFE",
                "optional":false,
                "extraMorbidityContributions":[
                  {
                    "contributor":{
                      "enquiryLine":"Build",
                      "triggerTag":"Height/weight ratio",
                      "derived":false
                    },
                    "value":{
                      "sum":25
                    }
                  }
                ]
              }
            ],
            "summary":{
              "loadingContributors":[
                {
                  "name":"Height/weight ratio"
                }
              ],
              "indicativeLoadingContributors":[

              ],
              "componentExclusions":[

              ],
              "evidence":[

              ],
              "declineContributors":[

              ],
              "declinedOptions":[

              ],
              "postponeReasons":[

              ],
              "productExclusions":[

              ]
            }
          }
        ],
        "immediateCover":true,
        "nonIndicative":false,
        "temporaryLoading":false
      },
      "product":{
        "id":"1aa16b90-66e4-49c6-97bb-faecedd8d3a2",
        "referenceId":"pro-001",
        "type":"TERM",
        "coverBasis":"LEVEL",
        "coverPeriod":12,
        "coverAmount":120000,
        "quotationBasis":"COVER_AMOUNT",
        "premiumBasis":"GUARANTEED",
        "premiumStyle":"LEVEL",
        "commissionSacrifice":{
          "initial":0,
          "renewal":2.5,
          "nilBased":false,
          "commissionStyle":"INDEMNITY"
        },
        "livesAssured":[
          {
            "name":"Marty",
            "surname":"Savva",
            "refersTo":"13992",
            "teleinterviewed":false
          }
        ]
      },
      "quote":{
        "state":"SUCCEEDED",
        "date":"2017-10-03T10:41:12.000",
        "premium":{
          "from":8.75,
          "to":8.75,
          "unloaded":{
            "from":7.4,
            "to":7.4
          },
          "lifetime":1260,
          "lives":[
            {
              "name":"Marty",
              "surname":"Savva",
              "refersTo":"13992",
              "wopContribution":0
            }
          ],
          "wopContribution":0
        },
        "sumAssured":120000,
        "commission":{
          "initial":193.8,
          "renewal":0.22,
          "commissionStyle":"INDEMNITY",
          "initialEarningsPeriod":48,
          "sacrifice":{
            "initial":0,
            "renewal":2.5,
            "nilBased":false
          }
        },
        "expiryDate":"2017-10-17",
        "anonymousQuote":false,
        "successful":true
      },
      "details":{
        "keyFacts":"https://www.lv.com/adviser/literature",
        "termsAndConditions":"https://www.lv.com/adviser/literature",
        "shortDescription":"Includes <b>terminal illness cover</b> and access to a free member helpline, offering legal, counselling and healthcare advice."
      },
      "multiProductDiscount":false,
      "purchasable":true,
      "quotable":true,
      "policyType":"default"
    }
  ];


  //create wrapper
  const wrapper = shallow((
    <NonStandardDecision
      CONSTS={CONSTS}
      className={className}
      underwrittenQuote={underwrittenQuote}
      quickQuote={quickQuote}
      lifeValue={lifeValue}
      customerCount={customerCount}
      customer1Name={customer1Name}
      customer2Name={customer2Name}
      customer1Id={customer1Id}
      customer2Id={customer2Id}
      decisionDetails={decisionDetails}
      additionalCover={additionalCover}
      coverLength={coverLength}
      coverType={coverType}
    />
  ));

  //tests
  // check props
  describe('Props', () => {
    it('has CONSTS prop', () => {
      expect(wrapper.instance().props.CONSTS).to.equal(CONSTS);
    });

    it('has className prop', () => {
      expect(wrapper.instance().props.className).to.equal(className);
    });

    it('has underwrittenQuote prop', () => {
      expect(wrapper.instance().props.underwrittenQuote).to.equal(underwrittenQuote);
    });

    it('has quickQuote prop', () => {
      expect(wrapper.instance().props.quickQuote).to.equal(quickQuote);
    });

    it('has lifeValue prop', () => {
      expect(wrapper.instance().props.lifeValue).to.equal(lifeValue);
    });

    it('has customerCount prop', () => {
      expect(wrapper.instance().props.customerCount).to.equal(customerCount);
    });

    it('has additionalCover prop', () => {
      expect(wrapper.instance().props.additionalCover).to.equal(additionalCover);
    });

    it('has coverLength prop', () => {
      expect(wrapper.instance().props.coverLength).to.equal(coverLength);
    });

    it('has coverType prop', () => {
      expect(wrapper.instance().props.coverType).to.equal(coverType);
    });

    it('has customer1Name prop', () => {
      expect(wrapper.instance().props.customer1Name).to.equal('Marty Savva');
    });

    it('has customer2Name prop', () => {
      expect(wrapper.instance().props.customer2Name).to.equal('');
    });

    it('has customer1Id prop', () => {
      expect(wrapper.instance().props.customer1Id).to.equal('1111');
    });

    it('has customer2Id prop', () => {
      expect(wrapper.instance().props.customer2Id).to.equal('2222');
    });

    it('has decisionDetails prop', () => {
      expect(wrapper.instance().props.decisionDetails).to.equal(decisionDetails);
    });
  });

  describe('DecisionBox', () => {
    it('renders DecisionBox', () => {
      expect(wrapper.find(DecisionBox)).to.have.length(1);
    });

    it('DecisionBox \'CONSTS\' prop to have correct text', () => {
      const db = wrapper.find(DecisionBox);
      expect(db.props().CONSTS).to.equal(CONSTS);
    });

    it('DecisionBox \'type\' prop to have correct text', () => {
      const db = wrapper.find(DecisionBox);
      expect(db.props().type).to.equal('non_standard');
    });

    it('DecisionBox \'text\' prop to have correct text', () => {
      const db = wrapper.find(DecisionBox);
      expect(db.props().text).to.equal('Your cover has been accepted on special terms');
    });
  });

  describe('CoverSummary', () => {
    it('renders CoverSummary', () => {
      expect(wrapper.find(CoverSummary)).to.have.length(1);
    });

    it('CoverSummary \'CONSTS\' prop to have correct text', () => {
      const cs = wrapper.find(CoverSummary);
      expect(cs.props().CONSTS).to.equal(CONSTS);
    });

    it('CoverSummary \'lifeValue\' prop to have correct text', () => {
      const cs = wrapper.find(CoverSummary);
      expect(cs.props().lifeValue).to.equal(lifeValue);
    });

    it('CoverSummary \'monthlyCost\' prop to have correct text', () => {
      const cs = wrapper.find(CoverSummary);
      expect(cs.props().monthlyCost).to.equal(underwrittenQuote.monthlyCost);
    });

    it('CoverSummary \'coverCovered\' prop to have correct text', () => {
      const cs = wrapper.find(CoverSummary);
      expect(cs.props().coverCovered).to.equal(customerCount);
    });

    it('CoverSummary \'additionalCover\' prop to have correct text', () => {
      const cs = wrapper.find(CoverSummary);
      expect(cs.props().additionalCover).to.deep.equal({});
    });

    it('CoverSummary \'coverLength\' prop to have correct text', () => {
      const cs = wrapper.find(CoverSummary);
      expect(cs.props().coverLength).to.deep.equal(coverLength);
    });

    it('CoverSummary \'coverType\' prop to have correct text', () => {
      const cs = wrapper.find(CoverSummary);
      expect(cs.props().coverType).to.deep.equal(coverType);
    });
  });

  describe('DecisionExplanationBox (common elements)', () => {
    it('renders DecisionExplanationBox', () => {
      expect(wrapper.find(DecisionExplanationBox)).to.have.length(1);
    });

    it('DecisionExplanationBox \'CONSTS\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().CONSTS).to.equal(CONSTS);
    });

    it('DecisionExplanationBox \'type\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().type).to.equal('non_standard');
    });

    it('DecisionExplanationBox \'className\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().className).to.equal(className);
    });

    it('DecisionExplanationBox \'customerCount\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().customerCount).to.equal(customerCount);
    });

    it('DecisionExplanationBox \'customer1Name\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().customer1Name).to.equal(customer1Name);
    });

    it('DecisionExplanationBox \'customer2Name\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().customer2Name).to.equal(customer2Name);
    });

    it('DecisionExplanationBox \'title1\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().title1).to.equal('What does \'special terms\' mean?');
    });

    it('DecisionExplanationBox \'title2\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().title2).to.equal('Why has this decision been made?');
    });

    it('DecisionExplanationBox \'title3\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().title3).to.equal('What happens next?');
    });

  });

  describe('DecisionExplanationBox (loaded)', () => {

    it('DecisionExplanationBox \'text1\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().text1).to.equal('We are able to offer you cover but the premium that you were originally quoted has gone up.');
    });

    it('DecisionExplanationBox \'text2\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().text2).to.equal('Based on the information you\'ve given us, we have increased your premium due to the following:');
    });

    it('DecisionExplanationBox \'title4\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().title4).to.equal('We\'ll offer you cover at the new increased premium');
    });

    it('DecisionExplanationBox \'customer1Decisions\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().customer1Decisions).to.deep.equal(['Height/weight ratio']);
    });

    it('DecisionExplanationBox \'customer2Decisions\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().customer2Decisions).to.deep.equal([]);
    });

    it('DecisionExplanationBox \'customer1Text4\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().customer1Text4).to.deep.equal([]);
    });

    it('DecisionExplanationBox \'customer2Text4\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().customer2Text4).to.deep.equal([]);
    });

    it('DecisionExplanationBox \'isLoadedOnly\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().isLoadedOnly).to.equal(true);
    });

  });

  describe('DecisionExplanationBox (excluded)', () => {

    // these two lifetime values determine whether the decision is loaded or not
    const underwrittenQuote = {
      monthlyCost: '12',
      lifetime: 8000
    };
    const quickQuote = {
      lifetime: 8000
    };

    const lifeValue = '8000';

    const customerDetails = [
      {
        "id":"liverpoolvictoria|3467d511-c98e-4ad2-99c0-0bc3ddce1fea|liverpoolvictoria-ci-life-level-1|00",
        "provider":"LiverpoolVictoria",
        "externalProductVariantId":107,
        "decision":{
          "type":"NON_STANDARD",
          "details":[
            {
              "customer":{
                "id":"1111",
                "name":"Marty",
                "surname":"Savva",
                "title":"Mr",
                "gender":"MALE",
                "atRiskOfSmoking":false,
                "enquiryClosed":false
              },
              "decisions":[
                {
                  "type":"STANDARD",
                  "componentType":"LIFE",
                  "optional":false
                },
                {
                  "type":"NON_STANDARD",
                  "componentType":"CI",
                  "optional":false,
                  "exclusionContributions":[
                    {
                      "contributor":{
                        "enquiryLine":"Blindness",
                        "triggerTag":"Your Blindness in both eyes",
                        "derived":false
                      },
                      "value":[
                        {
                          "code":"CIREMBLIND",
                          "description":"Blindness is removed as an insurable condition"
                        },
                        {
                          "code":"CIPARSIGH",
                          "description":"Partial loss of sight is removed as an insurable condition"
                        },
                        {
                          "code":"CIREMEYE",
                          "description":"Surgical removal of an eyeball is removed as an insurable condition"
                        }
                      ]
                    }
                  ]
                }
              ],
              "summary":{
                "loadingContributors":[

                ],
                "indicativeLoadingContributors":[

                ],
                "componentExclusions":[
                  {
                    "componentType":"CI",
                    "name":"Blindness is removed as an insurable condition"
                  },
                  {
                    "componentType":"CI",
                    "name":"Partial loss of sight is removed as an insurable condition"
                  },
                  {
                    "componentType":"CI",
                    "name":"Surgical removal of an eyeball is removed as an insurable condition"
                  }
                ],
                "evidence":[

                ],
                "declineContributors":[

                ],
                "declinedOptions":[

                ],
                "postponeReasons":[

                ],
                "productExclusions":[

                ]
              }
            }
          ],
          "immediateCover":true,
          "nonIndicative":false,
          "temporaryLoading":false
        },
        "product":{
          "id":"3467d511-c98e-4ad2-99c0-0bc3ddce1fea",
          "referenceId":"upsell-100",
          "type":"CRITICAL_ILLNESS_WITH_LIFE_COVER",
          "coverBasis":"LEVEL",
          "coverPeriod":12,
          "coverAmount":120000,
          "quotationBasis":"COVER_AMOUNT",
          "premiumBasis":"GUARANTEED",
          "premiumStyle":"LEVEL",
          "commissionSacrifice":{
            "initial":0,
            "renewal":2.5,
            "nilBased":false,
            "commissionStyle":"INDEMNITY"
          },
          "livesAssured":[
            {
              "name":"Marty",
              "surname":"Savva",
              "refersTo":"14003",
              "teleinterviewed":false
            }
          ]
        },
        "quote":{
          "state":"SUCCEEDED",
          "date":"2017-10-03T14:48:56.000",
          "premium":{
            "from":35.12,
            "to":35.12,
            "unloaded":{
              "from":35.12,
              "to":35.12
            },
            "lifetime":5057.28,
            "lives":[
              {
                "name":"Marty",
                "surname":"Savva",
                "refersTo":"14003",
                "wopContribution":0
              }
            ],
            "wopContribution":0
          },
          "sumAssured":120000,
          "commission":{
            "initial":777.88,
            "renewal":0.88,
            "commissionStyle":"INDEMNITY",
            "initialEarningsPeriod":48,
            "sacrifice":{
              "initial":0,
              "renewal":2.5,
              "nilBased":false
            }
          },
          "expiryDate":"2017-10-17",
          "anonymousQuote":false,
          "successful":true
        },
        "details":{
          "keyFacts":"https://www.lv.com/adviser/literature",
          "termsAndConditions":"https://www.lv.com/adviser/literature",
          "shortDescription":"Your client will be covered against 64 conditions, including 44 full payment and 20 partial payments. <b>16 unique enhanced claim payment conditions</b> pay your client up to £200,000 on top of their original amount of cover. Includes access to a free member helpline, offering legal, counselling and healthcare advice."
        },
        "multiProductDiscount":false,
        "purchasable":true,
        "quotable":true,
        "policyType":"default"
      }
    ];

    //create wrapper
    const wrapper2 = shallow((
      <NonStandardDecision
        CONSTS={CONSTS}
        className={className}
        underwrittenQuote={underwrittenQuote}
        quickQuote={quickQuote}
        lifeValue={lifeValue}
        customerCount={customerCount}
        customer1Name={customer1Name}
        customer2Name={customer2Name}
        customer1Id={customer1Id}
        customer2Id={customer2Id}
        decisionDetails={customerDetails}
        additionalCover={additionalCover}
        coverLength={coverLength}
        coverType={coverType}
      />
    ));

    it('DecisionExplanationBox \'text1\' prop to have correct text', () => {
      const cs = wrapper2.find(DecisionExplanationBox);
      expect(cs.props().text1).to.equal('We are able to offer you cover but certain conditions won\'t be covered by the Life and Critical Illness policy.');
    });

    it('DecisionExplanationBox \'text2\' prop to have correct text', () => {
      const cs = wrapper2.find(DecisionExplanationBox);
      expect(cs.props().text2).to.equal('We aren\'t able to cover you for the following reasons:');
    });

    it('DecisionExplanationBox \'title4\' prop to have correct text', () => {
      const cs = wrapper2.find(DecisionExplanationBox);
      expect(cs.props().title4).to.equal('We\'ll offer you cover with the exclusion of');
    });

    it('DecisionExplanationBox \'customer1Decisions\' prop to have correct text', () => {
      const cs = wrapper2.find(DecisionExplanationBox);
      expect(cs.props().customer1Decisions).to.deep.equal(['Your Blindness in both eyes']);
    });

    it('DecisionExplanationBox \'customer2Decisions\' prop to have correct text', () => {
      const cs = wrapper2.find(DecisionExplanationBox);
      expect(cs.props().customer2Decisions).to.deep.equal([]);
    });

    it('DecisionExplanationBox \'customer1Text4\' prop to have correct text', () => {
      const cs = wrapper2.find(DecisionExplanationBox);
      expect(cs.props().customer1Text4).to.deep.equal(['Blindness is removed as an insurable condition','Partial loss of sight is removed as an insurable condition','Surgical removal of an eyeball is removed as an insurable condition']);
    });

    it('DecisionExplanationBox \'customer2Text4\' prop to have correct text', () => {
      const cs = wrapper2.find(DecisionExplanationBox);
      expect(cs.props().customer2Text4).to.deep.equal([]);
    });

    it('DecisionExplanationBox \'isLoadedOnly\' prop be false', () => {
      const cs = wrapper2.find(DecisionExplanationBox);
      expect(cs.props().isLoadedOnly).to.equal(false);
    });

  });

  describe('DecisionExplanationBox (loaded & excluded)', () => {
    // these two lifetime values determine whether the decision is loaded or not
    const underwrittenQuote3 = {
      monthlyCost: '12',
      lifetime: 12000
    };
    const quickQuote3 = {
      lifetime: 8000
    };

    const lifeValue3 = '10000';

    const customerDetails3 = [
      {
        "id":"liverpoolvictoria|990dac25-9415-44fe-8852-dfbc75afe4ee|liverpoolvictoria-ci-life-level-1|00",
        "provider":"LiverpoolVictoria",
        "externalProductVariantId":107,
        "decision":{
          "type":"NON_STANDARD",
          "details":[
            {
              "customer":{
                "id":"1111",
                "name":"Marty",
                "surname":"Savva",
                "title":"Mr",
                "gender":"MALE",
                "atRiskOfSmoking":false,
                "enquiryClosed":false
              },
              "decisions":[
                {
                  "type":"NON_STANDARD",
                  "componentType":"LIFE",
                  "optional":false,
                  "extraMorbidityContributions":[
                    {
                      "contributor":{
                        "enquiryLine":"Build",
                        "triggerTag":"Height/weight ratio",
                        "derived":false
                      },
                      "value":{
                        "sum":25
                      }
                    }
                  ]
                },
                {
                  "type":"NON_STANDARD",
                  "componentType":"CI",
                  "optional":false,
                  "extraMorbidityContributions":[
                    {
                      "contributor":{
                        "enquiryLine":"Build",
                        "triggerTag":"Height/weight ratio",
                        "derived":false
                      },
                      "value":{
                        "sum":25
                      }
                    }
                  ],
                  "exclusionContributions":[
                    {
                      "contributor":{
                        "enquiryLine":"Blindness",
                        "triggerTag":"Your Blindness in both eyes",
                        "derived":false
                      },
                      "value":[
                        {
                          "code":"CIREMBLIND",
                          "description":"Blindness is removed as an insurable condition"
                        },
                        {
                          "code":"CIPARSIGH",
                          "description":"Partial loss of sight is removed as an insurable condition"
                        },
                        {
                          "code":"CIREMEYE",
                          "description":"Surgical removal of an eyeball is removed as an insurable condition"
                        }
                      ]
                    }
                  ]
                }
              ],
              "summary":{
                "loadingContributors":[
                  {
                    "name":"Height/weight ratio"
                  }
                ],
                "indicativeLoadingContributors":[

                ],
                "componentExclusions":[
                  {
                    "componentType":"CI",
                    "name":"Blindness is removed as an insurable condition"
                  },
                  {
                    "componentType":"CI",
                    "name":"Partial loss of sight is removed as an insurable condition"
                  },
                  {
                    "componentType":"CI",
                    "name":"Surgical removal of an eyeball is removed as an insurable condition"
                  }
                ],
                "evidence":[

                ],
                "declineContributors":[

                ],
                "declinedOptions":[

                ],
                "postponeReasons":[

                ],
                "productExclusions":[

                ]
              }
            }
          ],
          "immediateCover":true,
          "nonIndicative":false,
          "temporaryLoading":false
        },
        "product":{
          "id":"990dac25-9415-44fe-8852-dfbc75afe4ee",
          "referenceId":"upsell-100",
          "type":"CRITICAL_ILLNESS_WITH_LIFE_COVER",
          "coverBasis":"LEVEL",
          "coverPeriod":12,
          "coverAmount":120000,
          "quotationBasis":"COVER_AMOUNT",
          "premiumBasis":"GUARANTEED",
          "premiumStyle":"LEVEL",
          "commissionSacrifice":{
            "initial":0,
            "renewal":2.5,
            "nilBased":false,
            "commissionStyle":"INDEMNITY"
          },
          "livesAssured":[
            {
              "name":"Marty",
              "surname":"Savva",
              "refersTo":"13985",
              "teleinterviewed":false
            }
          ]
        },
        "quote":{
          "state":"SUCCEEDED",
          "date":"2017-10-03T10:16:33.000",
          "premium":{
            "from":43.4,
            "to":43.4,
            "unloaded":{
              "from":35.12,
              "to":35.12
            },
            "lifetime":6249.6,
            "lives":[
              {
                "name":"Marty",
                "surname":"Savva",
                "refersTo":"13985",
                "wopContribution":0
              }
            ],
            "wopContribution":0
          },
          "sumAssured":120000,
          "commission":{
            "initial":961.27,
            "renewal":1.08,
            "commissionStyle":"INDEMNITY",
            "initialEarningsPeriod":48,
            "sacrifice":{
              "initial":0,
              "renewal":2.5,
              "nilBased":false
            }
          },
          "expiryDate":"2017-10-17",
          "anonymousQuote":false,
          "successful":true
        },
        "details":{
          "keyFacts":"https://www.lv.com/adviser/literature",
          "termsAndConditions":"https://www.lv.com/adviser/literature",
          "shortDescription":"Your client will be covered against 64 conditions, including 44 full payment and 20 partial payments. <b>16 unique enhanced claim payment conditions</b> pay your client up to £200,000 on top of their original amount of cover. Includes access to a free member helpline, offering legal, counselling and healthcare advice."
        },
        "multiProductDiscount":false,
        "purchasable":true,
        "quotable":true,
        "policyType":"default"
      }
    ];

    //create wrapper
    const wrapper3 = shallow((
      <NonStandardDecision
        CONSTS={CONSTS}
        className={className}
        underwrittenQuote={underwrittenQuote3}
        quickQuote={quickQuote3}
        lifeValue={lifeValue3}
        customerCount={customerCount}
        customer1Name={customer1Name}
        customer2Name={customer2Name}
        customer1Id={customer1Id}
        customer2Id={customer2Id}
        decisionDetails={customerDetails3}
        additionalCover={additionalCover}
        coverLength={coverLength}
        coverType={coverType}
      />
    ));

    it('DecisionExplanationBox \'text1\' prop to have correct text', () => {
      const cs = wrapper3.find(DecisionExplanationBox);
      expect(cs.props().text1).to.equal('We are able to offer you cover but the premium originally quoted has gone up and certain conditions won\'t be covered under Critical Illness.');
    });

    it('DecisionExplanationBox \'text2\' prop to have correct text', () => {
      const cs = wrapper3.find(DecisionExplanationBox);
      expect(cs.props().text2).to.equal('The decision is due to the following');
    });

    it('DecisionExplanationBox \'title4\' prop to have correct text', () => {
      const cs = wrapper3.find(DecisionExplanationBox);
      expect(cs.props().title4).to.equal('We will offer you cover with the increased premium and the following exclusion');
    });

    it('DecisionExplanationBox \'customer1Decisions\' prop to have correct text', () => {
      const cs = wrapper3.find(DecisionExplanationBox);
      expect(cs.props().customer1Decisions).to.deep.equal(['Height/weight ratio', 'Your Blindness in both eyes']);
    });

    it('DecisionExplanationBox \'customer2Decisions\' prop to have correct text', () => {
      const cs = wrapper3.find(DecisionExplanationBox);
      expect(cs.props().customer2Decisions).to.deep.equal([]);
    });

    it('DecisionExplanationBox \'customer1Text4\' prop to have correct text', () => {
      const cs = wrapper3.find(DecisionExplanationBox);
      expect(cs.props().customer1Text4).to.deep.equal(['Blindness is removed as an insurable condition','Partial loss of sight is removed as an insurable condition','Surgical removal of an eyeball is removed as an insurable condition']);
    });

    it('DecisionExplanationBox \'customer2Text4\' prop to have correct text', () => {
      const cs = wrapper3.find(DecisionExplanationBox);
      expect(cs.props().customer2Text4).to.deep.equal([]);
    });

    it('DecisionExplanationBox \'isLoadedOnly\' prop be false', () => {
      const cs = wrapper3.find(DecisionExplanationBox);
      expect(cs.props().isLoadedOnly).to.equal(false);
    });

  });

  describe('DecisionExplanationBox (loaded & excluded) 2 people', () => {

    const customerCount = 2;

    // these two lifetime values determine whether the decision is loaded or not
    const underwrittenQuote = {
      monthlyCost: '12',
      lifetime: 12000
    };
    const quickQuote = {
      lifetime: 8000
    };

    const lifeValue = '10000';

    const customerDetails = [
      {
        "id":"liverpoolvictoria|990dac25-9415-44fe-8852-dfbc75afe4ee|liverpoolvictoria-ci-life-level-1|00",
        "provider":"LiverpoolVictoria",
        "externalProductVariantId":107,
        "decision":{
          "type":"NON_STANDARD",
          "details":[
            {
              "customer":{
                "id":"1111",
                "name":"Marty",
                "surname":"Savva",
                "title":"Mr",
                "gender":"MALE",
                "atRiskOfSmoking":false,
                "enquiryClosed":false
              },
              "decisions":[
                {
                  "type":"NON_STANDARD",
                  "componentType":"LIFE",
                  "optional":false,
                  "extraMorbidityContributions":[
                    {
                      "contributor":{
                        "enquiryLine":"Build",
                        "triggerTag":"Height/weight ratio",
                        "derived":false
                      },
                      "value":{
                        "sum":25
                      }
                    }
                  ]
                },
                {
                  "type":"NON_STANDARD",
                  "componentType":"CI",
                  "optional":false,
                  "extraMorbidityContributions":[
                    {
                      "contributor":{
                        "enquiryLine":"Build",
                        "triggerTag":"Height/weight ratio",
                        "derived":false
                      },
                      "value":{
                        "sum":25
                      }
                    }
                  ],
                  "exclusionContributions":[
                    {
                      "contributor":{
                        "enquiryLine":"Blindness",
                        "triggerTag":"Your Blindness in both eyes",
                        "derived":false
                      },
                      "value":[
                        {
                          "code":"CIREMBLIND",
                          "description":"Blindness is removed as an insurable condition"
                        },
                        {
                          "code":"CIPARSIGH",
                          "description":"Partial loss of sight is removed as an insurable condition"
                        },
                        {
                          "code":"CIREMEYE",
                          "description":"Surgical removal of an eyeball is removed as an insurable condition"
                        }
                      ]
                    }
                  ]
                }
              ],
              "summary":{
                "loadingContributors":[
                  {
                    "name":"Height/weight ratio"
                  }
                ],
                "indicativeLoadingContributors":[

                ],
                "componentExclusions":[
                  {
                    "componentType":"CI",
                    "name":"Blindness is removed as an insurable condition"
                  },
                  {
                    "componentType":"CI",
                    "name":"Partial loss of sight is removed as an insurable condition"
                  },
                  {
                    "componentType":"CI",
                    "name":"Surgical removal of an eyeball is removed as an insurable condition"
                  }
                ],
                "evidence":[

                ],
                "declineContributors":[

                ],
                "declinedOptions":[

                ],
                "postponeReasons":[

                ],
                "productExclusions":[

                ]
              }
            },
            {
              "customer":{
                "id":"2222",
                "name":"Frankie",
                "surname":"Sausage",
                "title":"Mr",
                "gender":"MALE",
                "atRiskOfSmoking":false,
                "enquiryClosed":false
              },
              "decisions":[
                {
                  "type":"NON_STANDARD",
                  "componentType":"LIFE",
                  "optional":false,
                  "extraMorbidityContributions":[
                    {
                      "contributor":{
                        "enquiryLine":"Build",
                        "triggerTag":"Height/weight ratio2",
                        "derived":false
                      },
                      "value":{
                        "sum":25
                      }
                    }
                  ]
                },
                {
                  "type":"NON_STANDARD",
                  "componentType":"CI",
                  "optional":false,
                  "extraMorbidityContributions":[
                    {
                      "contributor":{
                        "enquiryLine":"Build",
                        "triggerTag":"Height/weight ratio2",
                        "derived":false
                      },
                      "value":{
                        "sum":25
                      }
                    }
                  ],
                  "exclusionContributions":[
                    {
                      "contributor":{
                        "enquiryLine":"Blindness",
                        "triggerTag":"Your Blindness in both eyes2",
                        "derived":false
                      },
                      "value":[
                        {
                          "code":"CIREMBLIND",
                          "description":"Blindness is removed as an insurable condition"
                        },
                        {
                          "code":"CIPARSIGH",
                          "description":"Partial loss of sight is removed as an insurable condition"
                        },
                        {
                          "code":"CIREMEYE",
                          "description":"Surgical removal of an eyeball is removed as an insurable condition"
                        }
                      ]
                    }
                  ]
                }
              ],
              "summary":{
                "loadingContributors":[
                  {
                    "name":"Height/weight ratio2"
                  }
                ],
                "indicativeLoadingContributors":[

                ],
                "componentExclusions":[
                ],
                "evidence":[

                ],
                "declineContributors":[

                ],
                "declinedOptions":[

                ],
                "postponeReasons":[

                ],
                "productExclusions":[

                ]
              }
            }
          ],
          "immediateCover":true,
          "nonIndicative":false,
          "temporaryLoading":false
        },
        "product":{
          "id":"990dac25-9415-44fe-8852-dfbc75afe4ee",
          "referenceId":"upsell-100",
          "type":"CRITICAL_ILLNESS_WITH_LIFE_COVER",
          "coverBasis":"LEVEL",
          "coverPeriod":12,
          "coverAmount":120000,
          "quotationBasis":"COVER_AMOUNT",
          "premiumBasis":"GUARANTEED",
          "premiumStyle":"LEVEL",
          "commissionSacrifice":{
            "initial":0,
            "renewal":2.5,
            "nilBased":false,
            "commissionStyle":"INDEMNITY"
          },
          "livesAssured":[
            {
              "name":"Marty",
              "surname":"Savva",
              "refersTo":"13985",
              "teleinterviewed":false
            }
          ]
        },
        "quote":{
          "state":"SUCCEEDED",
          "date":"2017-10-03T10:16:33.000",
          "premium":{
            "from":43.4,
            "to":43.4,
            "unloaded":{
              "from":35.12,
              "to":35.12
            },
            "lifetime":6249.6,
            "lives":[
              {
                "name":"Marty",
                "surname":"Savva",
                "refersTo":"13985",
                "wopContribution":0
              }
            ],
            "wopContribution":0
          },
          "sumAssured":120000,
          "commission":{
            "initial":961.27,
            "renewal":1.08,
            "commissionStyle":"INDEMNITY",
            "initialEarningsPeriod":48,
            "sacrifice":{
              "initial":0,
              "renewal":2.5,
              "nilBased":false
            }
          },
          "expiryDate":"2017-10-17",
          "anonymousQuote":false,
          "successful":true
        },
        "details":{
          "keyFacts":"https://www.lv.com/adviser/literature",
          "termsAndConditions":"https://www.lv.com/adviser/literature",
          "shortDescription":"Your client will be covered against 64 conditions, including 44 full payment and 20 partial payments. <b>16 unique enhanced claim payment conditions</b> pay your client up to £200,000 on top of their original amount of cover. Includes access to a free member helpline, offering legal, counselling and healthcare advice."
        },
        "multiProductDiscount":false,
        "purchasable":true,
        "quotable":true,
        "policyType":"default"
      }
    ];

    //create wrapper
    const wrapper = shallow((
      <NonStandardDecision
        CONSTS={CONSTS}
        className={className}
        underwrittenQuote={underwrittenQuote}
        quickQuote={quickQuote}
        lifeValue={lifeValue}
        customerCount={customerCount}
        customer1Name={customer1Name}
        customer2Name={customer2Name}
        customer1Id={customer1Id}
        customer2Id={customer2Id}
        decisionDetails={customerDetails}
        additionalCover={additionalCover}
        coverLength={coverLength}
        coverType={coverType}
      />
    ));

    it('DecisionExplanationBox \'text1\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().text1).to.equal('We are able to offer you cover but the premium originally quoted has gone up and certain conditions won\'t be covered under Critical Illness.');
    });

    it('DecisionExplanationBox \'text2\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().text2).to.equal('The decision is due to the following');
    });

    it('DecisionExplanationBox \'title4\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().title4).to.equal('We will offer you cover with the increased premium and the following exclusion');
    });

    it('DecisionExplanationBox \'customer1Decisions\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().customer1Decisions).to.deep.equal(['Height/weight ratio', 'Your Blindness in both eyes']);
    });

    it('DecisionExplanationBox \'customer2Decisions\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().customer2Decisions).to.deep.equal(['Height/weight ratio2', 'Your Blindness in both eyes2']);
    });

    it('DecisionExplanationBox \'customer1Text4\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().customer1Text4).to.deep.equal(['Blindness is removed as an insurable condition','Partial loss of sight is removed as an insurable condition','Surgical removal of an eyeball is removed as an insurable condition']);
    });

    it('DecisionExplanationBox \'customer2Text4\' prop to have correct text', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().customer2Text4).to.deep.equal([]);
    });

    it('DecisionExplanationBox \'isLoadedOnly\' prop be false', () => {
      const cs = wrapper.find(DecisionExplanationBox);
      expect(cs.props().isLoadedOnly).to.equal(false);
    });

  });


});

