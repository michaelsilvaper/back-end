'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('User', {
      iduser: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      createdat: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      idrole: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            references: {
              model: "Role", 
              key: "idrole" 
            }
      },
      salt: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('User');
  }
};