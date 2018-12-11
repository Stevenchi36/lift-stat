const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = {
  async register(req, res) {
    try {
      const plainTextPW = req.body.password;
      bcrypt.hash(plainTextPW, 10, (err, hash) => {
        if (err) {
          res.status(500).send({
            error: 'There was a problem contacting the server',
          });
        } else {
          const user = {
            email: req.body.email,
            username: req.body.username,
            password: hash,
          };
          User.create(user);
          res.send(user);
        }
      });
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
        res.status(403).send({
          error: 'The login information was incorrect',
        });
      }
      bcrypt.compare(password, user.password, (err, isValid) => {
        console.log(isValid);
        if (err) {
          res.status(500).send({
            error: 'There was a problem contacting the server',
          });
        } if (isValid) {
          const userJson = user.toJSON();
          console.log('made it');
          res.send({
            user: userJson,
          });
        } else {
          res.status(403).send({
            error: 'The login information was incorrect',
          });
        }
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured',
      });
    }
  },
};
