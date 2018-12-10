const Joi = require('joi');

module.exports = {
  register(req, res, next) {
    const schema = {
      email: Joi.string().email().required(),
      username: Joi.string().alphanum().min(3).max(25)
        .required(),
      password: Joi.string().min(6).required(),
    };

    const { error } = Joi.validate(req.body, schema);

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email adress',
          });
          break;
        case 'username':
          res.status(400).send({
            error: 'You must provide a valid username',
          });
          break;
        case 'password':
          res.status(400).send({
            error: 'The password must be at least 6 characters',
          });
          break;
        default:
          res.status(400).send({
            error: 'Invalid registration information',
          });
      }
    } else {
      next();
    }
  },
};
