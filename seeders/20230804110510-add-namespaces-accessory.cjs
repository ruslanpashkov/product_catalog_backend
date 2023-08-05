'use strict';

const namespacesAccessory = require('./20230804110510-add-namespaces-accessory-data.json');
const TABLE_NAME = 'namespaces';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      namespacesAccessory,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
