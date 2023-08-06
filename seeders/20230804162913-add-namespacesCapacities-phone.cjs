'use strict';

const namespacesCapacitiesPhone = require('./20230804162913-add-namespacesCapacities-phone-data.json');
const TABLE_NAME = 'namespacesCapacities';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      namespacesCapacitiesPhone,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
