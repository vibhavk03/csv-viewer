const fs = require('fs');
const csvParser = require('csv-parser');
const CSV = require('../models/CSV');

module.exports = {
  upload: async function (req, res) {
    const results = [];
    /* reading and parsing uploaded csv file */
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        /* create a db record */
        try {
          await CSV.create({
            originalFileName: req.file.originalname,
            uniqueFileName: req.file.filename,
            data: results,
          });
        } catch (error) {
          console.log(`Error in saving file to db : ${error}`);
        }
        /* delete file from uploads folder after db operation */
        fs.unlink(req.file.path, function (err) {
          if (err) {
            console.log(`Error in deleteing file: ${err}`);
          }
        });
      });
    res.redirect('back');
  },
  delete: async function (req, res) {
    /* delete db record */
    try {
      await CSV.deleteOne({ _id: req.params.id });
    } catch (error) {
      console.log(`Error deleting file from db : ${error}`);
    }
    res.redirect('back');
  },
};
