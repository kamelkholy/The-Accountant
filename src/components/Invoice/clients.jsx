const clients = [
  {
    _id: 1,
    name: "client1",
    profit: 0
  },
  {
    _id: 2,
    name: "client2",
    profit: 0
  },
  {
    _id: 3,
    name: "client3",
    profit: 0
  },
  {
    _id: 4,
    name: "client4",
    profit: 0
  }
];

export const getAllClients = () => {
  return clients;
};

export const getClientByName = name => {
  return clients.find(c => c.name === name);
};
