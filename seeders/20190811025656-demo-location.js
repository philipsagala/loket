'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('locations', [
      {
        name: 'Plaza Festival',
        city: 'Jakarta',
        province: 'DKI Jakarta',
        address: 'Epicentrum, Jl. H. R. Rasuna Said No.Kav. 22, RT.2/RW.5, Karet Kuningan, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12940',
        longitude: '-6.2210176',
        latitude: '106.8308354',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jakarta International Expo',
        city: 'Jakarta',
        province: 'DKI Jakarta',
        address: 'Jl. Benyamin Sueb, RW.10, Pademangan Tim., Kec. Pademangan, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 14410',
        longitude: '-6.1464353',
        latitude: '106.8493896',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('locations', null, {});
  }
};
