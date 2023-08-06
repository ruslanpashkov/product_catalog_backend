'use strict';

const descriptionsAccessory = require('./20230804170109-add-descriptions-accessory-data.json');
const TABLE_NAME = 'descriptions';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      descriptionsAccessory,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
