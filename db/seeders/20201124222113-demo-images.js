'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Images', [
      {
        imageUrl: 'https://shmixieset-gallery-images.s3.amazonaws.com/IMAGE-1606241287131.jpg',
        galleryId: 1,
      },
      {
        imageUrl: 'https://shmixieset-gallery-images.s3.amazonaws.com/IMAGE-1606242395661.jpg',
        galleryId: 1,
      },
      {
        imageUrl: 'https://shmixieset-gallery-images.s3.amazonaws.com/IMAGE-1606245563538.JPG',
        galleryId: 1,
      }, {
        imageUrl: 'https://shmixieset-gallery-images.s3.amazonaws.com/IMAGE-1606249852663.JPG',
        galleryId: 1,
      },
      {
        imageUrl: 'https://shmixieset-gallery-images.s3.amazonaws.com/IMAGE-1606249855292.JPG',
        galleryId: 1,
      },
      {
        imageUrl: 'https://shmixieset-gallery-images.s3.amazonaws.com/IMAGE-1606249855864.JPG',
        galleryId: 1,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
