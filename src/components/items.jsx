const items = [
  {
    _id: 1,
    name: "item1",
    buyingPrice: "40",
    sellingPrice: "10",
    numberInStock: 4
  },
  {
    _id: 2,
    name: "item2",
    buyingPrice: "40",
    sellingPrice: "20",
    numberInStock: 4
  },
  {
    _id: 3,
    name: "item3",
    buyingPrice: "40",
    sellingPrice: "30",
    numberInStock: 4
  },
  {
    _id: 4,
    name: "item4",
    buyingPrice: "40",
    sellingPrice: "40",
    numberInStock: 4
  },
  {
    _id: 5,
    name: "item5",
    buyingPrice: "40",
    sellingPrice: "50",
    numberInStock: 4
  },
  {
    _id: 6,
    name: "item6",
    buyingPrice: "40",
    sellingPrice: "60",
    numberInStock: 4
  }
];

export const getAllItems = () => {
  return items;
};

export const getItemByName = name => {
  return items.find(i => i.name === name);
};
