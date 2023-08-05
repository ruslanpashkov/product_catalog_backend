'use strict';

const imagesColorAccessory = require('./20230804185138-add-imagesColor-accessory-data.json');
const TABLE_NAME = 'imagesColor';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      imagesColorAccessory,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
