'use strict';

const namespacesCapacitiesAccessory = require('./20230804164727-add-namespacesCapacities-accessory-data.json');
const TABLE_NAME = 'namespacesCapacities';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      namespacesCapacitiesAccessory,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
