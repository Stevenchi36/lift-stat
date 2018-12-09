module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  username: {
    type: DataTypes.STRING(24),
    unique: true,
  },
  password: DataTypes.STRING,
});
