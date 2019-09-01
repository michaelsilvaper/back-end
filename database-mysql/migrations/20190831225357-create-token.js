'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Token', {
      idtoken: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdat: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      isvalid: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        unique: true,
      },
      iduser: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        references: {
          model: "User", 
          key: "iduser" 
        }
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Token');
  }
};