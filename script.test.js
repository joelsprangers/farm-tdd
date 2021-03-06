const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./script");

//test input as a plant type object
const corn = {
  name: "corn",
  yield: 30,
  cost: 5,
  salePrice: 4,
  factors: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
    wind: {
      low: 0,
      medium: 0,
      high: 0,
    },
    temperature: {
      low: -70,
      medium: 20,
      high: 70,
    },
  },
};

const pumpkin = {
  name: "pumpkin",
  yield: 4,
  cost: 75,
  salePrice: 80,
  factors: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
    wind: {
      low: 0,
      medium: 0,
      high: 0,
    },
    temperature: {
      low: 10,
      medium: 10,
      high: 20,
    },
  },
};

const apple = {
  name: "apple",
  yield: 185,
  cost: 100,
  salePrice: 2,
  factors: {
    sun: {
      low: -30,
      medium: 0,
      high: 30,
    },
    wind: {
      low: 40,
      medium: 30,
      high: 20,
    },
    temperature: {
      low: -70,
      medium: 40,
      high: -10,
    },
  },
};

describe("getYieldForPlant", () => {
  test("Get yield for plant with no environment factors", () => {
    const environmentFactors = {};

    const input = {
      crop: corn,
      weather: environmentFactors,
    };
    expect(getYieldForPlant(input)).toBe(30);
  });

  test("Get yield for plant with sun low", () => {
    const environmentFactors = {
      sun: "low",
    };
    const input = {
      crop: corn,
      weather: environmentFactors,
    };
    expect(getYieldForPlant(input)).toBe(15);
  });

  test("Get yield for plant with sun high", () => {
    const environmentFactors = {
      sun: "high",
    };
    const input = {
      crop: corn,
      weather: environmentFactors,
    };
    expect(getYieldForPlant(input)).toBe(45);
  });

  test("Get yield for plant with wind low", () => {
    const environmentFactors = {
      wind: "low",
    };
    const input = {
      crop: corn,
      weather: environmentFactors,
    };
    expect(getYieldForPlant(input)).toBe(30);
  });

  test("Get yield for plant with temperature high", () => {
    const environmentFactors = {
      temperature: "high",
    };
    const input = {
      crop: corn,
      weather: environmentFactors,
    };
    expect(getYieldForPlant(input)).toBe(51);
  });

  test("Get yield for plant with temperature medium", () => {
    const environmentFactors = {
      temperature: "medium",
    };
    const input = {
      crop: corn,
      weather: environmentFactors,
    };
    expect(getYieldForPlant(input)).toBe(30 * 1.2);
  });

  test("Get yield for plant with sun high and wind low", () => {
    const environmentFactors = {
      sun: "high",
      wind: "low",
    };
    const input = {
      crop: corn,
      weather: environmentFactors,
    };
    expect(getYieldForPlant(input)).toBe(30 * 1.5);
  });

  test("Get yield for plant with temperature medium and sun high", () => {
    const environmentFactors = {
      sun: "high",
      temperature: "medium",
    };
    const input = {
      crop: corn,
      weather: environmentFactors,
    };
    expect(getYieldForPlant(input)).toBe(30 * 1.2 * 1.5);
  });

  test("Get yield for plant with temperature high and sun low", () => {
    const environmentFactors = {
      sun: "low",
      temperature: "high",
    };
    const input = {
      crop: corn,
      weather: environmentFactors,
    };
    expect(getYieldForPlant(input)).toBe(30 * 0.5 * 1.7);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop Get yield for plant with temperature high and sun low", () => {
    const environmentFactors = {
      sun: "low",
      temperature: "high",
    };
    const input = {
      crop: corn,
      numCrops: 10,
      weather: environmentFactors,
    };
    expect(getYieldForCrop(input)).toBe(30 * 0.5 * 1.7 * 10);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const environmentFactors = {};
    const input = {
      crop: corn,
      numCrops: 10,
      weather: environmentFactors,
    };
    const crops = [
      { crop: corn, numCrops: 5, weather: environmentFactors },
      { crop: pumpkin, numCrops: 2, weather: environmentFactors },
    ];
    expect(getTotalYield({ crops })).toBe(158);
  });

  test("Calculate total yield with multiple crops with sun high", () => {
    const environmentFactors = {
      sun: "high",
    };
    const input = {
      crop: corn,
      numCrops: 10,
      weather: environmentFactors,
    };
    const crops = [
      { crop: corn, numCrops: 5, weather: environmentFactors },
      { crop: pumpkin, numCrops: 2, weather: environmentFactors },
    ];
    expect(getTotalYield({ crops })).toBe(237);
  });

  test("Calculate total yield with 0 amount", () => {
    const environmentFactors = {};
    const crops = [{ crop: corn, numCrops: 0, weather: environmentFactors }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

describe("getCostsForCrop", () => {
  const environmentFactors = {};
  const input = {
    crop: pumpkin,
    numCrops: 10,
    weather: environmentFactors,
  };

  test("Get cost for crop", () => {
    expect(getCostsForCrop(input)).toBe(750);
  });
});

describe("getRevenueForCrop", () => {
  const environmentFactors = {};
  const input = {
    crop: apple,
    numCrops: 10,
    weather: environmentFactors,
  };

  test("Get revenue for crop", () => {
    expect(getRevenueForCrop(input)).toBe(3700);
  });
});

describe("getProfitForCrop", () => {
  test("Get profit for crop simple case", () => {
    const environmentFactors = {};
    const input = {
      crop: apple,
      numCrops: 10,
      weather: environmentFactors,
    };
    expect(getProfitForCrop(input)).toBe(2700);
  });

  test("Get profit for crop temperature medium and wind high", () => {
    const environmentFactors = {
      temperature: "medium",
      wind: "high",
    };
    const input = {
      crop: apple,
      numCrops: 10,
      weather: environmentFactors,
    };
    expect(getProfitForCrop(input)).toBe(185 * 1.4 * 1.2 * 10 * 2 - 10 * 100);
  });
}); //deze

describe("getTotalProfit", () => {
  test("Calculate total profit with multiple crops", () => {
    const environmentFactors = {};
    const crops = [
      { crop: corn, numCrops: 5, weather: environmentFactors },
      { crop: pumpkin, numCrops: 2, weather: environmentFactors },
      { crop: apple, numCrops: 4, weather: environmentFactors },
    ];
    expect(getTotalProfit({ crops })).toBe(2145);
  });

  test("Calculate total profit with multiple crops, sun high and wind low", () => {
    const environmentFactors = {
      sun: "high",
      wind: "low",
    };
    const crops = [
      { crop: corn, numCrops: 5, weather: environmentFactors },
      { crop: pumpkin, numCrops: 2, weather: environmentFactors },
      { crop: apple, numCrops: 4, weather: environmentFactors },
    ];
    expect(getTotalProfit({ crops })).toBe(3978.6);
  });

  test("Calculate total profit with 0 amount", () => {
    const environmentFactors = {};
    const crops = [{ crop: corn, numCrops: 0, weather: environmentFactors }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});
