const express = require("express");
const asyncHandler = require("express-async-handler");
const { Gallery } = require("../../db/models");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.get(
  '/:userId',
  asyncHandler(async (req, res) => {
    const galleries = await Gallery.findAll({
      where: {
        ownerId: req.params.userId
      }
    })
    res.json({ galleries });
  })
);

router.get(
  '/:userId/:galleryId',
  asyncHandler(async (req, res) => {
    const gallery = await Gallery.findOne({
      where: {
        id: req.params.galleryId
      }
    })
    res.json({ gallery });
  })
);

const validateGallery = [
  check('galleryName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a gallery name.'),
  check('galleryPassword')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

router.post(
  '/',
  requireAuth,
  validateGallery,
  asyncHandler(async (req, res) => {
    console.log(req);

    const { galleryName, galleryPassword, ownerId } = req.body;
    const gallery = await Gallery.create({
      name: galleryName,
      password: galleryPassword,
      ownerId
    });

    return res.json({
      gallery,
    });
  }),
);

router.put(
  '/:galleryId',
  asyncHandler(async (req, res) => {
    const { galleryId, imageUrl } = req.body;
    const gallery = await Gallery.findByPk(galleryId);

    await gallery.update({ coverImage: imageUrl }, {
      where: {
        coverImage: null,
      }
    });

    return res.json({
      gallery,
    });
  }),
);

router.delete(
  '/:galleryId',
  asyncHandler(async (req, res) => {
    const deletedGallery = await Gallery.destroy({
      where: {
        id: req.params.galleryId
      }
    })
    return res.json({ deletedGallery })
  })
)

module.exports = router;
