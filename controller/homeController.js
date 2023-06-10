const CSV = require('../models/CSV');

module.exports = {
  home: async function (req, res) {
    const files = await CSV.find({}).sort('-createdAt');
    res.render('home', {
      files,
    });
  },
};
