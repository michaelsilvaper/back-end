'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Role', {
      idrole: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      label: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      code: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      permissions: {
        allowNull: false,
        type: DataTypes.INTEGER,
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Role');
  }
};