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
      data = 2 ** Number.parseInt(((value * 30) / 3), 10);
      break;
    default:
      data = 1024;
      break;
  }

  return data;
};

const availableBed = (givenBed, severeCasesByRequestedTime) => {
  const availableBeds = givenBed * (35 / 100);
  const data = Number.parseInt(availableBeds, 10) - severeCasesByRequestedTime;
  return Number.parseInt(1 + data, 10);
};

const computeCurrentlyInfected = (data) => {
  // sscbrt=severeCasesByRequestedTime for severeImpact
  // iscbrt=severeCasesByRequestedTime for Impact
  const time = calculateTIme(data.periodType, data.timeToElapse);
  const fifetenpercent = (15 / 100);
  const impactCurrentlyInfected = (data.reportedCases) * 10;
  const severeImpactCurrentlyInfected = (data.reportedCases) * 50;
  output.severeImpact.currentlyInfected = severeImpactCurrentlyInfected;
  output.severeImpact.infectionsByRequestedTime = (severeImpactCurrentlyInfected) * time;
  const sscbrt = output.severeImpact.infectionsByRequestedTime * fifetenpercent;
  output.severeImpact.severeCasesByRequestedTime = sscbrt;
  output.severeImpact.hospitalBedsByRequestedTime = availableBed(data.totalHospitalBeds, sscbrt);
  output.impact.currentlyInfected = impactCurrentlyInfected;
  output.impact.infectionsByRequestedTime = (impactCurrentlyInfected) * time;
  const iscbrt = Number.parseInt(output.impact.infectionsByRequestedTime * fifetenpercent, 10);
  output.impact.severeCasesByRequestedTime = iscbrt;
  output.impact.hospitalBedsByRequestedTime = availableBed(data.totalHospitalBeds, iscbrt);
};

const covid19ImpactEstimator = (data) => {
  output.data = data;
  computeCurrentlyInfected(data);
  return output;
};

export default covid19ImpactEstimator;
