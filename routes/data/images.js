const db = require('../../bin/db');

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const multer  = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {

    const userID = req.user.id + "";
    const userUploadDir = path.join('/server','uploads',userID);

    if (!fs.existsSync(userUploadDir)) {
      fs.mkdirSync(userUploadDir, { recursive: true });
    }

    cb(null, userUploadDir);
  },
  filename: (req, file, cb) => {
    //cb(null, Date.now() + '-' + file.originalname);
    cb(null, file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[1]

  if (fileType == "png" || fileType == "PNG") {
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

    const user_id = req.user.id;
    const image_name = req.files[0].filename;

    const result = await db.pool.query(`INSERT IGNORE INTO user_images (user_id,image_name) VALUES (?,?);`, [user_id, image_name]);

    if(result.affectedRows == 1 || result.warningStatus == 1){
      res.status(200).send([{filename:image_name}]);
    } else {
      res.status(500).send([]);
    }

  } catch (err) {
    res.status(500).send([]);
    next(err)
  }
});

router.get('/all', isLoggedIn, async function(req, res, next) {
  try {

    const user_id = req.query.user_id;
    if(req.user.id == user_id) {
      const result = await db.pool.query("SELECT * FROM user_images WHERE user_id = ?",[user_id]);

      res.setHeader("Content-Type", "application/json; charset=UTF-8");
      res.json(result);
    } else {
      next('Permission denied.');
    }

  } catch (err) {
    next(err);
  }
});

router.get('/get', async function(req, res, next) {
  try {
    const user_id = req.query.user_id + "";
    const filename = req.query.filename + "";

    const filePath = path.join('/server','uploads',user_id,filename);
    res.sendFile(filePath);
  } catch(err) {
    next(err);
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router