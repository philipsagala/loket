'use strict';

module.exports = (sequelize, DataTypes) => {
  const transactionDetail = sequelize.define('transactionDetail', {
    qty: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {});
  transactionDetail.associate = function(models) {
    transactionDetail.belongsTo(models.transaction);
    transactionDetail.belongsTo(models.ticket);
  };
  return transactionDetail;
};