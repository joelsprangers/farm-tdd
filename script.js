//functions

const getYieldForPlant = (input) => {
  let environmentFactors = input.weather;
  let crop = input.crop;
  let newPlantYield = crop.yield;

  for (const [key, value] of Object.entries(crop.factors.sun)) {
    if (key == environmentFactors.sun) {
      newPlantYield = (crop.yield * (value + 100)) / 100;
      return newPlantYield;
    }
  }

  for (const [key, value] of Object.entries(crop.factors.wind)) {
    if (key == environmentFactors.wind) {
      newPlantYield = (crop.yield * (value + 100)) / 100;
      return newPlantYield;
    }
  }

  for (const [key, value] of Object.entries(crop.factors.temperature)) {
    if (key == environmentFactors.temperature) {
      newPlantYield = (crop.yield * (value + 100)) / 100;
      return newPlantYield;
    }
  }
  return newPlantYield;
};

const getYieldForCrop = (cropObject) =>
  cropObject.crop.yield * cropObject.numCrops;
//deze

const getTotalYield = ({ crops }) => {
  let total = 0;
  crops.forEach((crop) => {
    total += getYieldForCrop(crop);
  });
  return total;
};

const getCostsForCrop = (cropObject) =>
  cropObject.crop.cost * cropObject.numCrops;

const getRevenueForCrop = (cropObjectAndAmount) =>
  cropObjectAndAmount.crop.yield *
  cropObjectAndAmount.crop.salePrice *
  cropObjectAndAmount.numCrops;

const getProfitForCrop = (input) =>
  getRevenueForCrop(input) - getCostsForCrop(input);
//deze

const getTotalProfit = ({ crops }) => {
  let totalProfit = 0;

  crops.forEach((crop) => {
    totalProfit += getProfitForCrop(crop);
  });
  return totalProfit;
};
//deze

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
