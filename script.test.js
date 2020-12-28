const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./script");

//input as a plant type object
const corn = {
  name: "corn",
  yield: 3,
  cost: 5,
  salePrice: 4,
  factors: {
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  },
};
//15 yield, 25 aan kosten, 60 revenue, 35 winst

const pumpkin = {
  name: "pumpkin",
  yield: 4,
  cost: 75,
  salePrice: 80,
  factors: {
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  },
};
// 8 yield, 150 kosten, 640 opbrengst, 490 winst

const apple = {
  name: "apple",
  yield: 185,
  cost: 100,
  salePrice: 2,
  factors: {
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  },
};
// 740 apples, 400 kosten, 1480 opbrengst, 1080 winst

describe("getYieldForPlant", () => {
  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(3);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

describe("getCostsForCrop", () => {
  const input = {
    crop: pumpkin,
    numCrops: 10,
  };

  test("Get cost for crop", () => {
    expect(getCostsForCrop(input)).toBe(750);
  });
});

describe("getRevenueForCrop", () => {
  const input = {
    crop: apple,
    numCrops: 10,
  };

  test("Get revenue for crop", () => {
    expect(getRevenueForCrop(input)).toBe(3700);
  });
});

describe("getProfitForCrop", () => {
  const input = {
    crop: apple,
    numCrops: 10,
  };

  test("Get profit for crop", () => {
    expect(getProfitForCrop(input)).toBe(2700);
  });
});

describe("getTotalProfit", () => {
  test("Calculate total profit with multiple crops", () => {
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
      { crop: apple, numCrops: 4 },
    ];
    expect(getTotalProfit({ crops })).toBe(1605);
  });

  test("Calculate total profit with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
      cost: 5,
      salePrice: 4,
    };

    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});
