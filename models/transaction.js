'use strict';

module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    totalOrder: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  transaction.associate = function(models) {
    transaction.belongsTo(models.ticket);
    transaction.hasMany(models.transactionDetail);
  };
  return transaction;
};