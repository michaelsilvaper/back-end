module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      idrole: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      label: DataTypes.STRING,
      code: DataTypes.STRING,
      permissions: DataTypes.INTEGER
    },
    {
      freezeTableName: true,
      timestamps: false
    });
  
    return Role;
}