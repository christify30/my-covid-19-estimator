const output = {
  data: {},
  impact: {},
  severeImpact: {}
};

const calculateTIme = (type, value) => {
  let data;
  switch (type) {
    case 'days':
      data = 2 ** Number.parseInt((value / 3), 10);
      break;
    case 'weeks':
      data = 2 ** Number.parseInt(((value * 7) / 3), 10);
      break;
    case 'months':
      data = 2 ** Number.parseInt(((value * 28) / 3), 10);
      break;
    default:
      data = 1024;
      break;
  }

  return data;
};

const computeCurrentlyInfected = (data) => {
  const time = calculateTIme(data.periodType, data.timeToElapse);
  const impactCurrentlyInfected = (data.reportedCases) * 10;
  const severeImpactCurrentlyInfected = (data.reportedCases) * 50;
  output.severeImpact.currentlyInfected = severeImpactCurrentlyInfected;
  output.severeImpact.infectionsByRequestedTime = (severeImpactCurrentlyInfected) * time;
  output.impact.currentlyInfected = impactCurrentlyInfected;
  output.impact.infectionsByRequestedTime = (impactCurrentlyInfected) * time;
};

const covid19ImpactEstimator = (data) => {
  output.data = data;
  computeCurrentlyInfected(data);
  return output;
};

export default covid19ImpactEstimator;
