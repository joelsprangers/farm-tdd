//functions

const getYieldForPlant = (input) => {
  let environmentFactors = input.weather;
  let crop = input.crop;
  let newPlantYield = input.crop.yield;

  for (const [key, value] of Object.entries(crop.factors.sun)) {
    if (key === environmentFactors.sun) {
      newPlantYield = (newPlantYield * (value + 100)) / 100;
    }
  }

  for (const [key, value] of Object.entries(crop.factors.wind)) {
    if (key === environmentFactors.wind) {
      newPlantYield = (newPlantYield * (value + 100)) / 100;
    }
  }

  for (const [key, value] of Object.entries(crop.factors.temperature)) {
    if (key === environmentFactors.temperature) {
      newPlantYield = (newPlantYield * (value + 100)) / 100;
    }
  }
  return newPlantYield;
};

const getYieldForCrop = (input) => {
  let newPlantYield = getYieldForPlant(input);
  return newPlantYield * input.numCrops;
};

const getTotalYield = ({ crops }) => {
  let total = 0;
  crops.forEach((crop) => {
    total += getYieldForCrop(crop);
  });
  return total;
};

const getCostsForCrop = (input) => input.crop.cost * input.numCrops;

const getRevenueForCrop = (input) => {
  let yieldCrops = getYieldForCrop(input) * input.crop.salePrice;
  return yieldCrops;
};

const getProfitForCrop = (input) =>
  getRevenueForCrop(input) - getCostsForCrop(input);

const getTotalProfit = ({ crops }) => {
  let totalProfit = 0;

  crops.forEach((crop) => {
    totalProfit += getProfitForCrop(crop);
  });
  return totalProfit;
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
