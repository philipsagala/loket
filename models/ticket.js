'use strict';

module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    availableSeat: DataTypes.INTEGER
  }, {});
  ticket.associate = function(models) {
    ticket.belongsTo(models.event);
  };
  return ticket;
};