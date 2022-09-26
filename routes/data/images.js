const db = require('../../bin/db')

var express = require('express')
var router = express.Router()

const multer  = require('multer')

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/data/uploads/');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.originalname}`);
  },
});

const multerFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[1]
  console.log(fileType)
  if (fileType === "png" || fileType == "jpeg" || fileType == "jpg" || fileType == "svg+xml") {
    cb(null, true);
  } else {
    cb(new Error("Not a supported file."), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});


router.post('/upload', isLoggedIn, upload.array('files[]'), async function(req, res, next) {
  try {

    console.log(req.files)

    res.status(200).send([])

  } catch (err) {
    next(err)
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router