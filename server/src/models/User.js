const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

function hashPassword(user) {
  const SALT_FACTOR = 10;
  if (!user.changed('password')) {
    return;
  }
  const salt = bcrypt.genSaltSync(SALT_FACTOR);
  const hash = bcrypt.hashSync(user.password, salt);
  user.setDataValue('password', hash);
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(24),
      unique: true,
    },
    password: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword,
    },
  });

  User.prototype.comparePassword = function (password) {
    console.log(password, this.password);
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
