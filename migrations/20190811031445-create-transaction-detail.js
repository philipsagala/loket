'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactionDetails', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      transactionId: {
        type: Sequelize.STRING,
        references: {
          model: 'transactions',
          key: 'id'
        }
      },
      ticketId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tickets',
          key: 'id'
        }
      },
      qty: {
        type: Sequelize.INTEGER
      },
      totalPrice: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transactionDetails');
  }
};