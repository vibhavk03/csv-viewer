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
  view: async function (req, res) {
    try {
      const file = await CSV.findById(req.params.id);
      let headers;
      /* handle empty csv file */
      if (file.data.length === 0) {
        headers = [];
      } else {
        headers = Object.keys(file.data[0]);
      }
      res.render('fileView', {
        headers,
        file,
      });
    } catch (error) {
      console.log(`Error in fetching file from db : ${error}`);
      res.redirect('back');
    }
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
