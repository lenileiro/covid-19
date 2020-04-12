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

const estimateSevereCases = (input) => {
  const {
    data, impact, severeImpact
  } = input;

  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

  return {
    data,
    impact,
    severeImpact
  };
};

const estimateBedSpaceAvailability = (input) => {
  const {
    data, impact, severeImpact, data: { totalHospitalBeds }
  } = input;

  const availablebeds = 0.35 * totalHospitalBeds;

  impact.hospitalBedsByRequestedTime = availablebeds - impact.severeCasesByRequestedTime;
  const total = availablebeds - severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = total;
  return {
    data,
    impact,
    severeImpact
  };
};

const estimateCasesForICU = (input) => {
    const {
      data, impact, severeImpact
    } = input;
    impact.casesForICUByRequestedTime = 0.05 * impact.infectionsByRequestedTime;
    severeImpact.casesForICUByRequestedTime = 0.05 * severeImpact.infectionsByRequestedTime;
    return {
      data,
      impact,
      severeImpact
    };
  };

  const estimateCasesForVentilators = (input) => {
    const {
      data, impact, severeImpact
    } = input;
    impact.casesForVentilatorsByRequestedTime = 0.02 * impact.infectionsByRequestedTime;
    severeImpact.casesForVentilatorsByRequestedTime = 0.02 * severeImpact.infectionsByRequestedTime;
  
    return {
      data,
      impact,
      severeImpact
    };
  };
  
  const estimateDollarsInFlight = (input) => {
    const {
      data, impact, severeImpact, data: {
        periodType, timeToElapse, region: { avgDailyIncomeInUSD, avgDailyIncomePopulation }
      }
    } = input;
  
    const days = getDays(periodType, timeToElapse);
  
    impact.dollarsInFlight = impact.infectionsByRequestedTime
      * avgDailyIncomePopulation * avgDailyIncomeInUSD * days;
    severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime
      * avgDailyIncomePopulation * avgDailyIncomeInUSD * days;
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
    estimateProjectedInfections,

    // challenge 2
    estimateSevereCases,
    estimateBedSpaceAvailability,

    // challenge 3
    estimateCasesForICU,
    estimateCasesForVentilators,
    estimateDollarsInFlight
  );

  return estimator({
    data,
    impact: {},
    severeImpact: {}
  });
};

module.exports = covid19ImpactEstimator;
