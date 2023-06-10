const fs = require('fs');
const csvParser = require('csv-parser');
const CSV = require('../models/CSV');

module.exports = {
  upload: async function (req, res) {
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        await CSV.create({
          originalFileName: req.file.originalname,
          uniqueFileName: req.file.filename,
          data: results,
        });
      });
    // delete file from uploads folder after successful insertion in db
    res.redirect('back');
  },
};
