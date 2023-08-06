'use strict';

const namespacesPhone = require('./20230802134640-add-namespaces-phone-data.json');
const TABLE_NAME = 'namespaces';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      namespacesPhone,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
