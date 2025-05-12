const mongoose = require('mongoose');

const fileDownloadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  fileUrl: {
    type: String,
    required: true,
  },

  downloadedAt: {
    type: Date,
    default: Date.now,
  },
});

const FileDownload = mongoose.model('FileDownload', fileDownloadSchema);

module.exports = FileDownload;
