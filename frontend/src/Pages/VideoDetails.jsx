

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import Navbar from "../components/Navbar";

function VideoDetails() {
  const { id } = useParams();

  const videoRef = useRef(null);

  const API_URL = "http://localhost:5000";

  // Video
  const [video, setVideo] = useState(null);

  // Loading
  const [loading, setLoading] = useState(true);

  // Player
  const [isPlaying, setIsPlaying] =
    useState(false);

  const [volume, setVolume] =
    useState(1);

  const [progress, setProgress] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  // Quality
  const [quality, setQuality] =
    useState("720p");

  const [showQuality, setShowQuality] =
    useState(false);

  // Like
  const [likes, setLikes] =
    useState(0);

  const [liked, setLiked] =
    useState(false);

    // Prevent duplicate view
const viewAddedRef = useRef(false);

// Prevent duplicate like
const likeRequestRef = useRef(false);


  // Message
  const [message, setMessage] =
    useState("");

  // --------------------------------
  // FETCH VIDEO
  // --------------------------------

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/videos/${id}`
        );

        if (!response.ok) {
          throw new Error(
            "Video not found"
          );
        }

        const data =
          await response.json();

        setVideo(data);

        setLikes(data.likes || 0);

        const alreadyLiked =
          localStorage.getItem(
            `liked-${id}`
          );

        if (
          alreadyLiked === "true"
        ) {
          setLiked(true);
        }

      } catch (error) {
        console.error(
          "Fetch video error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  // --------------------------------
  // ADD VIEW
  // --------------------------------

 // --------------------------------
// ADD VIEW
// --------------------------------

useEffect(() => {
  if (!id || viewAddedRef.current) return;

  // Lock immediately
  viewAddedRef.current = true;

  const addView = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/videos/${id}/view`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "View update failed"
        );
      }

      // Update view count immediately
      setVideo((oldVideo) => {
        if (!oldVideo) {
          return oldVideo;
        }

        return {
          ...oldVideo,
          views:
            data.views ??
            oldVideo.views,
        };
      });
    } catch (error) {
      console.error(
        "View update error:",
        error
      );

      // Allow retry if request failed
      viewAddedRef.current = false;
    }
  };

  addView();
}, [id]);
      

  // --------------------------------
  // PLAY / PAUSE
  // --------------------------------

  const togglePlay = () => {
    if (!videoRef.current) {
      return;
    }

    if (
      videoRef.current.paused
    ) {
      videoRef.current.play();

      setIsPlaying(true);
    } else {
      videoRef.current.pause();

      setIsPlaying(false);
    }
  };

  // --------------------------------
  // METADATA
  // --------------------------------

  const handleLoadedMetadata =
    () => {
      if (videoRef.current) {
        setDuration(
          videoRef.current.duration
        );
      }
    };

  // --------------------------------
  // PROGRESS
  // --------------------------------

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(
        videoRef.current.currentTime
      );
    }
  };

  // --------------------------------
  // CHANGE PROGRESS
  // --------------------------------

  const handleProgressChange = (
    e
  ) => {
    const value = Number(
      e.target.value
    );

    if (videoRef.current) {
      videoRef.current.currentTime =
        value;
    }

    setProgress(value);
  };

  // --------------------------------
  // VOLUME
  // --------------------------------

  const handleVolumeChange = (
    e
  ) => {
    const value = Number(
      e.target.value
    );

    setVolume(value);

    if (videoRef.current) {
      videoRef.current.volume =
        value;
    }
  };

  // --------------------------------
  // FORMAT TIME
  // --------------------------------

  const formatTime = (time) => {
    if (
      !time ||
      isNaN(time)
    ) {
      return "0:00";
    }

    const minutes =
      Math.floor(time / 60);

    const seconds =
      Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  // --------------------------------
  // MESSAGE
  // --------------------------------

  const showMessage = (
    text
  ) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 700);
  };

  // --------------------------------
  // FORWARD
  // --------------------------------

  const forward10 = () => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.currentTime =
      Math.min(
        videoRef.current
          .currentTime + 10,
        videoRef.current
          .duration
      );

    showMessage(
      "⏩ +10 seconds"
    );
  };

  // --------------------------------
  // BACKWARD
  // --------------------------------

  const backward10 = () => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.currentTime =
      Math.max(
        videoRef.current
          .currentTime - 10,
        0
      );

    showMessage(
      "⏪ -10 seconds"
    );
  };

  // --------------------------------
  // DOUBLE CLICK
  // --------------------------------

  const handleDoubleClick = (
    side
  ) => {
    if (side === "left") {
      backward10();
    } else {
      forward10();
    }
  };

  // --------------------------------
  // VIDEO URL
  // --------------------------------

  const videoUrl = video
    ? `${API_URL}${video.videoUrl}`
    : "";

  // --------------------------------
  // QUALITY
  // --------------------------------

  const qualityVideos = {
    "144p": videoUrl,
    "240p": videoUrl,
    "480p": videoUrl,
    "720p": videoUrl,
    "1080p": videoUrl,
  };

  // --------------------------------
  // QUALITY CHANGE
  // --------------------------------

  const changeQuality = (
    newQuality
  ) => {
    if (!videoRef.current) {
      return;
    }

    const currentTime =
      videoRef.current.currentTime;

    const playing =
      !videoRef.current.paused;

    setQuality(newQuality);

    setShowQuality(false);

    videoRef.current.src =
      qualityVideos[newQuality];

    videoRef.current.load();

    videoRef.current.onloadedmetadata =
      () => {
        videoRef.current.currentTime =
          currentTime;

        if (playing) {
          videoRef.current.play();

          setIsPlaying(true);
        }
      };
  };

  // --------------------------------
  // FULLSCREEN
  // --------------------------------

  const handleFullscreen =
    async () => {
      const player =
        document.querySelector(
          ".video-player-container"
        );

      if (!player) {
        return;
      }

      if (
        !document.fullscreenElement
      ) {
        await player.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    };

  // --------------------------------
  // LIKE
  // --------------------------------

 // --------------------------------
// LIKE
// --------------------------------

const handleLike = async () => {
  // Already liked
  if (liked) {
    return;
  }

  // Like request already running
  if (likeRequestRef.current) {
    return;
  }

  // Lock immediately
  likeRequestRef.current = true;

  try {
    const response = await fetch(
      `${API_URL}/api/videos/${id}/like`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Like failed"
      );
    }

    setLikes(data.likes);

    setLiked(true);

    localStorage.setItem(
      `liked-${id}`,
      "true"
    );
  } catch (error) {
    console.error(
      "Like error:",
      error
    );

    // Allow retry if request failed
    likeRequestRef.current = false;
  }
};
  // --------------------------------
  // DOWNLOAD
  // --------------------------------

  const handleDownload = () => {
    if (!video) {
      return;
    }

    const downloads =
      JSON.parse(
        localStorage.getItem(
          "downloads"
        )
      ) || [];

    const downloadVideo = {
      id: video._id,

      title: video.title,

      description:
        video.description,

      thumbnail:
        video.thumbnailUrl
          ? `${API_URL}${video.thumbnailUrl}`
          : "/images/video-thumbnail.jpg",

      videoUrl: videoUrl,

      quality: quality,

      downloadedAt:
        new Date().toLocaleString(),
    };

    const alreadyDownloaded =
      downloads.some(
        (item) =>
          item.id === video._id
      );

    if (
      !alreadyDownloaded
    ) {
      downloads.push(
        downloadVideo
      );

      localStorage.setItem(
        "downloads",
        JSON.stringify(
          downloads
        )
      );
    }

    alert(
      "Video added to Downloads"
    );
  };

  // --------------------------------
  // LOADING
  // --------------------------------

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="video-details-page">
          <p>
            Loading video...
          </p>
        </main>
      </>
    );
  }

  // --------------------------------
  // NOT FOUND
  // --------------------------------

  if (!video) {
    return (
      <>
        <Navbar />

        <main className="video-details-page">

          <h2>
            Video not found
          </h2>

          <Link to="/">
            Go Home
          </Link>

        </main>
      </>
    );
  }

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <>
      <Navbar />

      <main className="video-details-page">

        {/* VIDEO PLAYER */}

        <div className="video-player-container">

          <div className="video-wrapper">

            <video
              ref={videoRef}

              src={videoUrl}

              className="main-video"

              onLoadedMetadata={
                handleLoadedMetadata
              }

              onTimeUpdate={
                handleTimeUpdate
              }

              onPlay={() =>
                setIsPlaying(true)
              }

              onPause={() =>
                setIsPlaying(false)
              }

              playsInline
            />

            {/* LEFT DOUBLE TAP */}

            <div
              className="double-tap-left"

              onDoubleClick={() =>
                handleDoubleClick(
                  "left"
                )
              }
            />

            {/* RIGHT DOUBLE TAP */}

            <div
              className="double-tap-right"

              onDoubleClick={() =>
                handleDoubleClick(
                  "right"
                )
              }
            />

            {/* MESSAGE */}

            {message && (
              <div className="skip-message">
                {message}
              </div>
            )}

            {/* CENTER PLAY */}

            {!isPlaying && (
              <button
                className="center-play"
                onClick={togglePlay}
              >
                ▶
              </button>
            )}

          </div>

          {/* CONTROLS */}

          <div className="video-controls">

            {/* PROGRESS */}

            <div className="progress-row">

              <span>
                {formatTime(
                  progress
                )}
              </span>

              <input
                type="range"
                min="0"
                max={
                  duration || 0
                }
                value={progress}
                onChange={
                  handleProgressChange
                }
              />

              <span>
                {formatTime(
                  duration
                )}
              </span>

            </div>

            {/* BUTTONS */}

            <div className="control-row">

              <button
                onClick={togglePlay}
              >
                {isPlaying
                  ? "⏸"
                  : "▶"}
              </button>

              <button
                onClick={backward10}
              >
                ↶ 10
              </button>

              <button
                onClick={forward10}
              >
                10 ↷
              </button>

              {/* VOLUME */}

              <div className="volume">

                <span>
                  {volume === 0
                    ? "🔇"
                    : "🔊"}
                </span>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={
                    handleVolumeChange
                  }
                />

              </div>

              {/* QUALITY */}

              <div className="quality">

                <button
                  onClick={() =>
                    setShowQuality(
                      !showQuality
                    )
                  }
                >
                  ⚙ {quality}
                </button>

                {showQuality && (
                  <div className="quality-menu">

                    <h4>
                      Quality
                    </h4>

                    {[
                      "144p",
                      "240p",
                      "480p",
                      "720p",
                      "1080p",
                    ].map(
                      (item) => (
                        <button
                          key={item}
                          onClick={() =>
                            changeQuality(
                              item
                            )
                          }
                        >
                          {item}

                          {quality ===
                            item && (
                            <span>
                              {" "}
                              ✓
                            </span>
                          )}
                        </button>
                      )
                    )}

                  </div>
                )}

              </div>

              {/* FULLSCREEN */}

              <button
                onClick={
                  handleFullscreen
                }
              >
                ⛶
              </button>

            </div>

          </div>
        </div>

        {/* VIDEO INFORMATION */}

        <div className="video-information">

          <span className="video-category">
            {video.language}
          </span>

          <h1>
            {video.title}
          </h1>

          <p>
            {video.description}
          </p>

          {/* STATS */}

          <div className="video-stats">

            <span>
              👁{" "}
              {video.views || 0} Views
            </span>

            <span>
              ❤️ {likes} Likes
            </span>

            <span>
              🎥 {quality}
            </span>

          </div>

          {/* ACTIONS */}

          <div className="video-actions">

            <button
              className="like-button"
              onClick={handleLike}
              disabled={liked}
            >
              {liked
                ? "❤️ Liked"
                : "👍 Like"}
            </button>

            <button
              className="download-button"
              onClick={
                handleDownload
              }
            >
              ⬇ Download
            </button>

            <Link
              to="/downloads"
              className="downloads-button"
            >
              My Downloads
            </Link>

          </div>

        </div>

      </main>
    </>
  );
}

export default VideoDetails;



