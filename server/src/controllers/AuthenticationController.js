const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { User } = require('../models');

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(req, res) {
    try {
      console.log(req.body);
      const user = await User.create(req.body);
      console.log('made it');
      res.send(user.toJSON());
    } catch (err) {
      res.status(400).send({
        error: 'This email or username is already in use.',
      });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        console.log('hi');
        return res.status(403).send({
          error: 'The login information was incorrect',
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect',
        });
      }

      const userJson = user.toJSON();
      return res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      return res.status(500).send({
        error: 'An error has occured',
      });
    }
  },
};
