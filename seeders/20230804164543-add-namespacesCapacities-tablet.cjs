'use strict';

const namespacesCapacitiesTablet = require('./20230804164543-add-namespacesCapacities-tablet-data.json');
const TABLE_NAME = 'namespacesCapacities';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      namespacesCapacitiesTablet,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
