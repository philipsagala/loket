'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactionDetail = sequelize.define('transactionDetail', {
    qty: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {});
  transactionDetail.associate = function(models) {
    // associations can be defined here
  };
  return transactionDetail;
};