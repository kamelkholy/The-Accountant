const invoices = [
  {
    client: {
      name: "client1",
      _id: 1
    },
    date: new Date(
      "Tue Feb 05 2019 00:00:00 GMT+0200 (Eastern European Standard Time)"
    ),
    items: [
      {
        item: {
          _id: 3,
          name: "item3",
          buyingPrice: "40",
          sellingPrice: "30",
          numberInStock: 4
        },
        price: 30,
        quantity: 2,
        subtotal: 60
      },
      {
        item: {
          _id: 6,
          name: "item6",
          buyingPrice: "40",
          sellingPrice: "60",
          numberInStock: 4
        },
        price: 60,
        quantity: 3,
        subtotal: 180
      },
      {
        item: {
          _id: 1,
          name: "item1",
          buyingPrice: "40",
          sellingPrice: "10",
          numberInStock: 4
        },
        price: 10,
        quantity: 9,
        subtotal: 90
      }
    ],
    total: 330
  },
  {
    client: {
      name: "client2",
      _id: 2
    },
    date: new Date(
      "Wed Feb 06 2019 00:00:00 GMT+0200 (Eastern European Standard Time)"
    ),
    items: [
      {
        item: {
          _id: 3,
          name: "item3",
          buyingPrice: "40",
          sellingPrice: "30",
          numberInStock: 4
        },
        price: 30,
        quantity: 2,
        subtotal: 60
      },
      {
        item: {
          _id: 6,
          name: "item6",
          buyingPrice: "40",
          sellingPrice: "60",
          numberInStock: 4
        },
        price: 60,
        quantity: 3,
        subtotal: 180
      },
      {
        item: {
          _id: 2,
          name: "item2",
          buyingPrice: "40",
          sellingPrice: "20",
          numberInStock: 4
        },
        price: 20,
        quantity: 9,
        subtotal: 180
      }
    ],
    total: 420
  },
  {
    client: {
      name: "client4",
      _id: 4
    },
    date: new Date(
      "Tue Feb 12 2019 00:00:00 GMT+0200 (Eastern European Standard Time)"
    ),
    items: [
      {
        item: {
          _id: 6,
          name: "item6",
          buyingPrice: "40",
          sellingPrice: "60",
          numberInStock: 4
        },
        price: 60,
        quantity: 3,
        subtotal: 180
      },
      {
        item: {
          _id: 2,
          name: "item2",
          buyingPrice: "40",
          sellingPrice: "20",
          numberInStock: 4
        },
        price: 20,
        quantity: 9,
        subtotal: 180
      },
      {
        item: {
          _id: 1,
          name: "item1",
          buyingPrice: "40",
          sellingPrice: "10",
          numberInStock: 4
        },
        price: 10,
        quantity: 13,
        subtotal: 130
      },
      {
        item: {
          _id: 4,
          name: "item4",
          buyingPrice: "40",
          sellingPrice: "40",
          numberInStock: 4
        },
        price: 40,
        quantity: 2,
        subtotal: 80
      }
    ],
    total: 570
  }
];

export const getAllInvoices = () => {
  return invoices;
};
