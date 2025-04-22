const multer = require("multer");
const path = require("path");
const fs = require('fs');
const { get } = require("http");

function uploadSingleFile(module) { 
    if (!module) {
        throw new Error("Module name is required.");
      }
//define storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Ensure the 'uploads/' directory exists
      const uploadPath = path.join( __dirname, '..','..', 'uploads', module);
      fs.mkdir(uploadPath, { recursive: true }, (err) => {
        if (err) {
          return cb(err); // Pass error to callback
        }
        cb(null, uploadPath); // Pass directory path to callback
      });
    },
    filename: (req, file, cb) => {
    //  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //  cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    cb(null, file.originalname); // Generate unique filename  
    },
  });
  return storage;
}
function getUploadMiddleware(module) {
    const storage = uploadSingleFile(module);
    return multer({ storage });
  }

module.exports = getUploadMiddleware;
