'use strict';

const descriptionsTablet = require('./20230804170102-add-descriptions-tablet-data.json');
const TABLE_NAME = 'descriptions';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      descriptionsTablet,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
