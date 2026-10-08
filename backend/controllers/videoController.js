
const fs = require("fs");
const path = require("path");

const Video = require("../models/Video");

// ======================================
// HELPER - GET UPLOAD FILE PATH
// ======================================

const getUploadFilePath = (fileUrl) => {
  if (!fileUrl) {
    return null;
  }

  const cleanPath = fileUrl.replace(/^[/\\]+/, "");

  return path.join(
    __dirname,
    "..",
    cleanPath
  );
};

// ======================================
// ADD VIDEO
// ======================================

const addVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      language,
    } = req.body;

    if (!title || !description || !language) {
      return res.status(400).json({
        message:
          "Title, description and language are required",
      });
    }

    if (
      !req.files ||
      !req.files.video ||
      !req.files.video[0]
    ) {
      return res.status(400).json({
        message: "Video file is required",
      });
    }

    const videoFile = req.files.video[0];

    const thumbnailFile =
      req.files.thumbnail &&
      req.files.thumbnail[0]
        ? req.files.thumbnail[0]
        : null;

    const video = await Video.create({
      title,
      description,
      language,

      videoUrl:
        `/uploads/videos/${videoFile.filename}`,

      thumbnailUrl:
        thumbnailFile
          ? `/uploads/thumbnails/${thumbnailFile.filename}`
          : "",

      views: 0,
      likes: 0,
    });

    res.status(201).json({
      message: "Video uploaded successfully",
      video,
    });
  } catch (error) {
    console.error(
      "Add video error:",
      error
    );

    res.status(500).json({
      message: "Failed to upload video",
    });
  }
};

// ======================================
// GET ALL VIDEOS
// ======================================

const getVideos = async (req, res) => {
  try {
    const { language } = req.query;

    const filter = {};

    if (language) {
      filter.language = language;
    }

    const videos = await Video.find(filter)
      .sort({
        createdAt: -1,
      });

    res.json(videos);
  } catch (error) {
    console.error(
      "Get videos error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch videos",
    });
  }
};

// ======================================
// GET SINGLE VIDEO
// ======================================

const getVideoById = async (req, res) => {
  try {
    const video =
      await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.json(video);
  } catch (error) {
    console.error(
      "Get video error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch video",
    });
  }
};

// ======================================
// UPDATE VIDEO
// ======================================

const updateVideo = async (req, res) => {
  try {
    const video =
      await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const {
      title,
      description,
      language,
    } = req.body;

    if (title !== undefined) {
      video.title = title;
    }

    if (description !== undefined) {
      video.description = description;
    }

    if (language !== undefined) {
      video.language = language;
    }

    // ==================================
    // REPLACE VIDEO FILE
    // ==================================

    if (
      req.files &&
      req.files.video &&
      req.files.video[0]
    ) {
      const oldVideoPath =
        getUploadFilePath(
          video.videoUrl
        );

      if (
        oldVideoPath &&
        fs.existsSync(oldVideoPath)
      ) {
        fs.unlinkSync(oldVideoPath);
      }

      const newVideo =
        req.files.video[0];

      video.videoUrl =
        `/uploads/videos/${newVideo.filename}`;
    }

    // ==================================
    // REPLACE THUMBNAIL
    // ==================================

    if (
      req.files &&
      req.files.thumbnail &&
      req.files.thumbnail[0]
    ) {
      const oldThumbnailPath =
        getUploadFilePath(
          video.thumbnailUrl
        );

      if (
        oldThumbnailPath &&
        fs.existsSync(oldThumbnailPath)
      ) {
        fs.unlinkSync(
          oldThumbnailPath
        );
      }

      const newThumbnail =
        req.files.thumbnail[0];

      video.thumbnailUrl =
        `/uploads/thumbnails/${newThumbnail.filename}`;
    }

    await video.save();

    res.json({
      message:
        "Video updated successfully",
      video,
    });
  } catch (error) {
    console.error(
      "Update video error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update video",
    });
  }
};

// ======================================
// DELETE VIDEO
// ======================================

const deleteVideo = async (req, res) => {
  try {
    const video =
      await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // ==================================
    // DELETE ACTUAL VIDEO FILE
    // ==================================

    if (video.videoUrl) {
      const videoPath =
        getUploadFilePath(
          video.videoUrl
        );

      if (
        videoPath &&
        fs.existsSync(videoPath)
      ) {
        fs.unlinkSync(videoPath);
      }
    }

    // ==================================
    // DELETE ACTUAL THUMBNAIL FILE
    // ==================================

    if (video.thumbnailUrl) {
      const thumbnailPath =
        getUploadFilePath(
          video.thumbnailUrl
        );

      if (
        thumbnailPath &&
        fs.existsSync(thumbnailPath)
      ) {
        fs.unlinkSync(thumbnailPath);
      }
    }

    // ==================================
    // DELETE MONGODB DOCUMENT
    // ==================================

    await Video.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Video, thumbnail and MongoDB data deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete video error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to delete video",
    });
  }
};

// ======================================
// ADD VIEW
// ======================================

const addView = async (req, res) => {
  try {
    const video =
      await Video.findByIdAndUpdate(
        req.params.id,
        {
          $inc: {
            views: 1,
          },
        },
        {
          new: true,
        }
      );

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.json({
      views: video.views,
    });
  } catch (error) {
    console.error(
      "View error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update views",
    });
  }
};

// ======================================
// ADD LIKE
// ======================================

const addLike = async (req, res) => {
  try {
    const video =
      await Video.findByIdAndUpdate(
        req.params.id,
        {
          $inc: {
            likes: 1,
          },
        },
        {
          new: true,
        }
      );

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.json({
      likes: video.likes,
    });
  } catch (error) {
    console.error(
      "Like error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update likes",
    });
  }
};

// ======================================
// EXPORT
// ======================================

module.exports = {
  addVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  addView,
  addLike,
};







