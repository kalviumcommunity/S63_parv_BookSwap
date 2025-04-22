const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads/', // Specify the directory to save files
  filename: function(req, file, cb){
    // Generate a unique filename: fieldname-timestamp.extension
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Check File Type (Optional but recommended)
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|webp/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!'); // Send an error if file type is wrong
  }
}

// Init upload variable
const upload = multer({
  storage: storage,
  limits:{fileSize: 5 * 1024 * 1024}, // Optional: Limit file size (e.g., 5MB)
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('profilePicture'); // **Crucial:** 'profilePicture' MUST match the key used in frontend FormData

module.exports = upload;