'use strict';

const namespacesTablet = require('./20230804111054-add-namespaces-tablet-data.json');
const TABLE_NAME = 'namespaces';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      namespacesTablet,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
