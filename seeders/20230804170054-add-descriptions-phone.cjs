'use strict';

const descriptionsPhone = require('./20230804170054-add-descriptions-phone-data.json');
const TABLE_NAME = 'descriptions';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      descriptionsPhone,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
