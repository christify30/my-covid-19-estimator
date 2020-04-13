const output = {
  data: {},
  estimate: {
    impact: {},
    severeImpact: {}
  }
};

const computeCurrentlyInfected = (data) => {
  const impactCurrentlyInfected = data.reportedCases * 10;
  const severeImpactCurrentlyInfected = data.reportedCases * 50;
  output.estimate.severeImpact.currentlyInfected = severeImpactCurrentlyInfected;
  output.estimate.severeImpact.infectionsByRequestedTime = severeImpactCurrentlyInfected * 1024;
  output.estimate.impact.currentlyInfected = impactCurrentlyInfected;
  output.estimate.impact.infectionsByRequestedTime = impactCurrentlyInfected * 1024;
};

const covid19ImpactEstimator = (data) => {
  output.data = data;
  computeCurrentlyInfected(data);
  return output;
};

export default covid19ImpactEstimator;
