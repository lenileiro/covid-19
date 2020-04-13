const { onCovid19, defaultConfig } = require('on-covid-19');
const estimator = require('./estimator');

const result = onCovid19(defaultConfig, estimator)
  .estimateImpactAfter(28)
  .days();

console.dir(result);
