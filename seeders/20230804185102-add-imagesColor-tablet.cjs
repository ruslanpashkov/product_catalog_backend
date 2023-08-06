'use strict';

const imagesColorTablet = require('./20230804185102-add-imagesColor-tablet-data.json');
const TABLE_NAME = 'imagesColor';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      imagesColorTablet,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
