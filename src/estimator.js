const { chain } = require('on-covid-19');


const getDays = (periodType, timeToElapse) => {
  let days = 0;
  if (periodType === 'DAYS' || periodType === 'days') {
    days = timeToElapse;
  } else if (periodType === 'WEEKS' || periodType === 'WEEK' || periodType === 'weeks' || periodType === 'week') {
    days = timeToElapse * 7;
  } else if (periodType === 'MONTHS' || periodType === 'MONTH' || periodType === 'months' || periodType === 'months') {
    days = timeToElapse * 30;
  }
  return days;
};

const getTimeDuration = (periodType, timeToElapse) => {
  const days = getDays(periodType, timeToElapse);
  const projected = (2 ** Math.floor(days / 3));
  return projected;
};

const estimateCurrentlyInfected = (input) => {
    const severeImpact = {};
    const impact = {};
    const { data, data: { reportedCases } } = input;
  
    impact.currentlyInfected = reportedCases * 10;
  
    severeImpact.currentlyInfected = reportedCases * 50;
  
    return {
      data,
      impact,
      severeImpact
    };
};

const estimateProjectedInfections = (input) => {
  const {
    data, impact, severeImpact, data: { periodType, timeToElapse }
  } = input;

  const projected = getTimeDuration(periodType, timeToElapse);

  impact.infectionsByRequestedTime = impact.currentlyInfected * projected;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * projected;
  return {
    data,
    impact,
    severeImpact
  };
};


const covid19ImpactEstimator = (data) => {
  const estimator = chain(

    // challenge 1
    estimateCurrentlyInfected,
    estimateProjectedInfections
  );

  return estimator({
    data,
    impact: {},
    severeImpact: {}
  });
};

module.exports = covid19ImpactEstimator;