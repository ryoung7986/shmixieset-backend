'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {

    static associate(models) {
      Gallery.belongsTo(models.User, {
        allowNull: false,
        foreignKey: 'ownerId'
      });
      Gallery.belongsToMany(models.User, {
        through: 'UserGallery'
      });
      Gallery.hasMany(models.Image, {
        foreignKey: 'galleryId',
        onDelete: 'cascade',
      });
    }
  };

  Gallery.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coverImage: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Gallery',
  });
  return Gallery;
};
