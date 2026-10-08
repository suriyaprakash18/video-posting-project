const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  addVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  addView,
  addLike,
} = require("../controllers/videoController");

const adminAuth =
  require("../middleware/adminAuth");

const router =
  express.Router();

// ======================================
// MULTER STORAGE
// ======================================

const storage =
  multer.diskStorage({
    destination: (req, file, cb) => {
      if (
        file.fieldname === "video"
      ) {
        cb(
          null,
          "uploads/videos"
        );
      } else if (
        file.fieldname === "thumbnail"
      ) {
        cb(
          null,
          "uploads/thumbnails"
        );
      } else {
        cb(
          new Error(
            "Invalid file field"
          )
        );
      }
    },

    filename: (req, file, cb) => {
      const uniqueName =
        Date.now() +
        "-" +
        Math.round(
          Math.random() * 1e9
        );

      const extension =
        path.extname(
          file.originalname
        );

      cb(
        null,
        uniqueName + extension
      );
    },
  });

// ======================================
// FILE FILTER
// ======================================

const fileFilter =
  (req, file, cb) => {
    if (
      file.fieldname === "video"
    ) {
      const allowedVideos = [
        "video/mp4",
        "video/webm",
        "video/quicktime",
      ];

      if (
        allowedVideos.includes(
          file.mimetype
        )
      ) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Only video files are allowed"
          )
        );
      }
    }

    else if (
      file.fieldname ===
      "thumbnail"
    ) {
      const allowedImages = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (
        allowedImages.includes(
          file.mimetype
        )
      ) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Only JPG, PNG or WEBP images are allowed"
          )
        );
      }
    }

    else {
      cb(
        new Error(
          "Invalid file type"
        )
      );
    }
  };

// ======================================
// MULTER
// ======================================

const upload =
  multer({
    storage,
    fileFilter,

    limits: {
      fileSize:
        500 * 1024 * 1024,
    },
  });

// ======================================
// PUBLIC ROUTES
// ======================================

// Get all videos
router.get(
  "/",
  getVideos
);

// Get single video
router.get(
  "/:id",
  getVideoById
);

// Add view
router.patch(
  "/:id/view",
  addView
);

// Add like
router.patch(
  "/:id/like",
  addLike
);

// ======================================
// ADMIN ROUTES
// ======================================

// Add video
router.post(
  "/",
  adminAuth,

  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),

  addVideo
);

// Update video
router.put(
  "/:id",
  adminAuth,

  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),

  updateVideo
);

// Delete video
router.delete(
  "/:id",
  adminAuth,
  deleteVideo
);

module.exports = router;