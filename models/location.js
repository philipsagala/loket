'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('location', {
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
  };
  return Location;
};