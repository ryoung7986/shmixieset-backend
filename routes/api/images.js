const express = require("express");
const asyncHandler = require("express-async-handler");
const { Image } = require("../../db/models");

const router = express.Router();

router.get(
  '/:galleryId',
  asyncHandler(async (req, res) => {
    const galleryImages = await Image.findAll({
      where: {
        galleryId: req.params.galleryId
      }
    })
    res.json({ galleryImages });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { imageUrl, galleryId } = req.body;
    const image = await Image.create({
      imageUrl,
      galleryid
    });
    return res.json({
      image,
    });
  }),
);

module.exports = router;
