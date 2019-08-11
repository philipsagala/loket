'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {  
    return queryInterface.bulkInsert('events', [{
      locationId: 1,
      name: "Gebyar Loket Indonesia",
      start: "2020-01-31 09:00:00",
      end: "2020-02-01 21:00:00",
      createdAt: new Date(),
      updatedAt: new Date()  
    },{
      locationId: 2,
      name: "Jakarta Loket Expo",
      start: "2020-01-31 09:00:00",
      end: "2020-02-01 21:00:00",
      createdAt: new Date(),
      updatedAt: new Date() 
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('events', null, {});
  }
};
