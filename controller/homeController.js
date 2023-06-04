module.exports = {
  home: async function (req, res) {
    res.render('home', {
      title: 'CSV Viewer',
    });
  },
};
