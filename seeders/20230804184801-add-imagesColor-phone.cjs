'use strict';

const imagesColorPhone = require('./20230804184801-add-imagesColor-phone-data.json');
const TABLE_NAME = 'imagesColor';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      imagesColorPhone,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
