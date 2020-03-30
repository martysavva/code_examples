/* eslint-disable */

const config = {
    activeEnv: 'local',
    decision:  {
        STANDARD: 'standard',
        DECLINED: 'decline',
        POSTPONE: 'postpone',
        NON_STANDARD_LOADED: 'non_standard_loaded',
        NON_STANDARD_EXCLUDED: 'non_standard_excluded',
        NON_STANDARD_LOADED_EXCLUDED: 'non_standard_loaded_excluded',
        EVIDENCE_REQUIRED: 'evidence_required',
        REFER: 'refer'
    },
    testUrls: {
      local: 'http://localhost:7000',
      uat: 'https://d2c-lv-staging-dev-01.underwriteme.co.uk/',
      qa: 'https://d2c-lv-qa-01.underwriteme.co.uk/'
    }
};

export default config;
