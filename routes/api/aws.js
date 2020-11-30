const express = require('express');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
const multer = require('multer');

const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { Image } = require("../../db/models");

const router = express.Router();

const path = require('path');

// configuring the DiscStorage engine.
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage, limits: { fileSize: 10000000000000 } });
const multipleUpload = multer({ storage, limits: { fileSize: 10000000000000 } }).array("file");

// CONFIGURE KEYS FOR ACCESSING AWS:
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  Bucket: process.env.S3_BUCKET,
  region: process.env.REGION,
});

// CREATE S3 INSTANCE:
const s3 = new AWS.S3();

function uploadFile(source, targetName, res) {
  console.log('preparing to upload...');
  fs.readFile(source, function (err, filedata) {
    if (!err) {
      const putParams = {
        Bucket: process.env.S3_BUCKET,
        Key: targetName,
        Body: filedata,
        ACL: "public-read",
      };

      s3.putObject(putParams, function (err, data) {
        if (err) {
          console.error('Could not upload the file. Error :', err);
          return res.send({ success: false });
        }
        else {
          // fs.unlinkSync(source);// Deleting the file from uploads folder(Optional).Do Whatever you prefer.
          console.log('Successfully uploaded the file');
          return
        }
      });
    }
    else {
      console.error({ 'err': err });
    }
  })
};

// Define POST route
router.post('/', multipleUpload, asyncHandler(async (req, res) => {
  for (let i = 0; i < req.files.length; i++) {
    uploadFile(req.files[i].path, req.files[i].filename, res);
    await Image.create({
      imageUrl: `https://shmixieset-gallery-images.s3.amazonaws.com/${req.files[i].filename}`,
      galleryId: req.body.id
    })
  }
}));

module.exports = router;
