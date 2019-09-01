var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../../../config').secret;

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      iduser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
      createdat: DataTypes.DATE,
      idrole: DataTypes.INTEGER,
      salt: DataTypes.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    });

    User.prototype.validPassword = function(password) {
      var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
      return this.password === hash;
    };

    User.prototype.setPassword = function(password){
      this.salt = crypto.randomBytes(16).toString('hex');
      this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    };

    User.prototype.generateJWT = function() {
      var today = new Date();
      var exp = new Date(today);
      exp.setDate(today.getDate() + 60);
    
      return jwt.sign({
        id: this.iduser,
        username: this.email,
        exp: parseInt(exp.getTime() / 1000),
      }, secret);
    };

    User.prototype.toAuthJSON = function(){
      return {
        username: this.email,
        email: this.email,
        token: this.generateJWT(),
        name: this.name
      };
    };
  
    return User;
}