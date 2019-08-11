'use strict';

module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    totalOrder: DataTypes.INTEGER
  }, {});
  transaction.associate = function(models) {
    transaction.belongsTo(models.ticket);
  };
  return transaction;
};