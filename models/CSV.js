const mongoose = require('mongoose');

const csvSchema = new mongoose.Schema(
  {
    originalFileName: {
      type: String,
      trim: true,
      required: true,
    },
    uniqueFileName: {
      type: String,
      trim: true,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CSV = new mongoose.model('CSV', csvSchema);

module.exports = CSV;
