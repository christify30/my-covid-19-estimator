const output = {
  data: {},
  impact: {},
  severeImpact: {}
};

const computeCurrentlyInfected = (data) => {
  const impactCurrentlyInfected = data.reportedCases * 10;
  const severeImpactCurrentlyInfected = data.reportedCases * 50;
  output.severeImpact.currentlyInfected = severeImpactCurrentlyInfected;
  output.severeImpact.infectionsByRequestedTime = severeImpactCurrentlyInfected * 1024;
  output.impact.currentlyInfected = impactCurrentlyInfected;
  output.impact.infectionsByRequestedTime = impactCurrentlyInfected * 1024;
};

const covid19ImpactEstimator = (data) => {
  output.data = data;
  computeCurrentlyInfected(data);
  return output;
};

export default covid19ImpactEstimator;
