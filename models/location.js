'use strict';

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    province: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
  }, {});
  Location.associate = function(models) {
    Location.hasMany(models.event);
  };
  return Location;
};