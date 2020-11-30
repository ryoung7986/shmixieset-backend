'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Galleries', [
      {
        ownerId: 1,
        name: 'Demo Gallery #1',
        password: 'password',
      },
      {
        ownerId: 1,
        name: 'Demo Gallery #2',
        password: 'password',
      },
      {
        ownerId: 1,
        name: 'Demo Gallery #3',
        password: 'password',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Galleries', null, {});
  }
};
