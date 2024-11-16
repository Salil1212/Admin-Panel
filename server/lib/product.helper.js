const multer = require('multer');
const path = require('path');
const httpStatus = require('http-status');


// Helper to validate file type
const fileFilter = (fileType) => (req, file, cb) => {
  if (file.mimetype.includes(fileType)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type, only ${fileType} are allowed`), false);
  }
};


const localFileUpload = (fileType, localPath, fileNameFn, fileFieldName) => (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, localPath)); // Specify the local storage path
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/').pop();
      const fileName = fileNameFn(req, file);
      cb(null, `${fileName}.${extension}`);
    },
  });
  const upload = multer({
    fileFilter: fileFilter(fileType),
    storage,
  }).single(fileFieldName);
  upload(req, res, (err) => {
    if (err) {
      console.log("File upload error:", err); // Log error for debugging
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ errors: [{ title: 'File Upload Error', detail: err.message }] });
    }
    next();
  });
};
module.exports = { localFileUpload };
