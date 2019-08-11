'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tickets', [{
      eventId: 1,
      name: "Festival VVIP",
      type: "VVIP",
      price: 900000,
      openSeat: 100,
      availableSeat: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      eventId: 1,
      name: "Festival VIP",
      type: "VIP",
      price: 750000,
      openSeat: 100,
      availableSeat: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      eventId: 1,
      name: "Festival Gebyar",
      type: "Festival",
      price: 350000,
      openSeat: 1000,
      availableSeat: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      eventId: 2,
      name: "Expo VVIP",
      type: "VVIP",
      price: 900000,
      openSeat: 100,
      availableSeat: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      eventId: 2,
      name: "Expo VIP",
      type: "VIP",
      price: 750000,
      openSeat: 100,
      availableSeat: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      eventId: 2,
      name: "Expo Gebyar",
      type: "Festival",
      price: 350000,
      openSeat: 1000,
      availableSeat: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tickets', null, {});
  }
};
