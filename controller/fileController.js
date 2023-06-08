module.exports = {
  upload: async function (req, res) {
    console.log('here in file upload');
    res.render('home', {
      title: 'CSV Viewer',
    });
  },
};
