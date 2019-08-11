'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    name: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {});
  event.associate = function(models) {
    // associations can be defined here
  };
  return event;
};