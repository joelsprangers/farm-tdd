const getYieldForPlant = (plantObject) => plantObject.yield;

const getYieldForCrop = (cropObject) =>
  cropObject.crop.yield * cropObject.numCrops;

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
