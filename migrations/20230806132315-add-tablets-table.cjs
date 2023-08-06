'use strict';

const TABLE_NAME = 'tablets';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      TABLE_NAME,
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
        },
        resolution: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        processor: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        camera: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        zoom: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cell: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false
        },
        namespaceId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'namespaces',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
        },
        productId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          references: {
            model: 'products',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE_NAME);
  }
};
