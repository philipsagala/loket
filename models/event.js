'use strict';

module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    name: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {});
  event.associate = function(models) {
    event.belongsTo(models.location);
    event.hasMany(models.ticket);
  };
  return event;
};