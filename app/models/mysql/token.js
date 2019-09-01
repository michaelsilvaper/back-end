module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {
      idtoken: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      token: DataTypes.STRING,
      createdat: DataTypes.DATE,
      isvalid: DataTypes.BOOLEAN,
      iduser: DataTypes.INTEGER
    },
    {
      freezeTableName: true,
      timestamps: false
    });
  
    return Token;
}