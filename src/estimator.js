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

const dollarsInFlight = (data, infectionsByRequestedTime) => {
  let result;
  const id = (infectionsByRequestedTime * data.region.avgDailyIncomePopulation);
  switch (data.periodType) {
    case 'days':
      result = id * data.region.avgDailyIncomeInUSD * data.timeToElapse;
      break;
    case 'weeks':
      result = id * data.region.avgDailyIncomeInUSD * (data.timeToElapse * 7);
      break;
    case 'months':
      result = id * data.region.avgDailyIncomeInUSD * (data.timeToElapse * 30);
      break;
    default:
      result = id * data.region.avgDailyIncomeInUSD * data.timeToElapse;
      break;
  }

  return result;
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
  const fivepercent = (5 / 100);
  const twopercent = (2 / 100);
  const impactCurrentlyInfected = (data.reportedCases) * 10;
  const severeImpactCurrentlyInfected = (data.reportedCases) * 50;
  output.severeImpact.currentlyInfected = severeImpactCurrentlyInfected;
  output.severeImpact.infectionsByRequestedTime = (severeImpactCurrentlyInfected) * time;
  const sscbrt = output.severeImpact.infectionsByRequestedTime * fifetenpercent;
  output.severeImpact.severeCasesByRequestedTime = sscbrt;
  output.severeImpact.hospitalBedsByRequestedTime = availableBed(data.totalHospitalBeds, sscbrt);
  const scasesForICUByRequestedTime = fivepercent * output.severeImpact.infectionsByRequestedTime;
  output.severeImpact.casesForICUByRequestedTime = Number.parseInt(scasesForICUByRequestedTime, 10);
  const sventilator = twopercent * output.severeImpact.infectionsByRequestedTime;
  output.severeImpact.casesForVentilatorsByRequestedTime = Number.parseInt(sventilator, 10);
  const sdfc = dollarsInFlight(data, output.severeImpact.infectionsByRequestedTime);
  output.severeImpact.dollarsInFlight = parseInt(sdfc, 10); // boundary
  output.impact.currentlyInfected = impactCurrentlyInfected;
  output.impact.infectionsByRequestedTime = (impactCurrentlyInfected) * time;
  const iscbrt = Number.parseInt(output.impact.infectionsByRequestedTime * fifetenpercent, 10);
  output.impact.severeCasesByRequestedTime = iscbrt;
  output.impact.hospitalBedsByRequestedTime = availableBed(data.totalHospitalBeds, iscbrt);
  const icasesForICUByRequestedTime = fivepercent * output.impact.infectionsByRequestedTime;
  output.impact.casesForICUByRequestedTime = parseInt(icasesForICUByRequestedTime, 10);
  const iventilator = twopercent * output.impact.infectionsByRequestedTime;
  output.impact.casesForVentilatorsByRequestedTime = parseInt(iventilator, 10); // boundary
  const idfc = dollarsInFlight(data, output.impact.infectionsByRequestedTime);
  output.impact.dollarsInFlight = parseInt(idfc, 10);
};

const covid19ImpactEstimator = (data) => {
  output.data = data;
  computeCurrentlyInfected(data);
  return output;
};

export default covid19ImpactEstimator;
