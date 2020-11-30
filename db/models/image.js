'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {

    static associate(models) {
      Image.belongsTo(models.Gallery, {
        allowNull: false,
        foreignKey: 'galleryId'
      });
    }
  };

  Image.init({
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    galleryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isFavorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
