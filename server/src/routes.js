module.exports = (app) => {
  app.post('/register', (req, res) => {
    res.send({
      message: `${req.body.email} was registered`,
    });
  });
};
