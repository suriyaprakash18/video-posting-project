// import React, { useState } from "react";

// import Navbar from "../components/Navbar";
// import VideoCard from "../components/VideoCard";
// import Pagination from "../components/Pagination";

// function EnglishVideos() {

//   const [currentPage, setCurrentPage] =
//     useState(1);


//   const videos = Array.from(
//     { length: 1000 },
//     (_, index) => ({

//       id: `english-${index + 1}`,

//       title:
//         `English Video ${index + 1}`,

//       description:
//         `This is English video ${index + 1}`,

//       thumbnail:
//         "/images/video-thumbnail.jpg",

//       videoUrl:
//         "/videos/sample.mp4",

//       views:
//         (index + 1) * 150,

//       likes:
//         index * 4,

//       category:
//         "English"

//     })
//   );


//   const videosPerPage = 10;


//   const totalPages =
//     Math.ceil(
//       videos.length / videosPerPage
//     );


//   const startIndex =
//     (currentPage - 1) *
//     videosPerPage;


//   const currentVideos =
//     videos.slice(
//       startIndex,
//       startIndex + videosPerPage
//     );


//   return (

//     <>
//       <Navbar />

//       <main className="videos-container">

//         <div className="page-heading">

//           <h1>
//             English Videos
//           </h1>

//           <p>
//             Watch our English videos
//           </p>

//         </div>


//         <div className="video-grid">

//           {currentVideos.map(
//             (video) => (

//               <VideoCard
//                 key={video.id}
//                 video={video}
//               />

//             )
//           )}

//         </div>


//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />

//       </main>

//     </>

//   );
// }

// export default EnglishVideos;





import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import VideoCard from "../components/VideoCard";
import Pagination from "../components/Pagination";

function EnglishVideos() {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const videosPerPage = 10;

  // Get English videos from backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/videos?language=English"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }

        const data = await response.json();

        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Total pages
  const totalPages = Math.ceil(
    videos.length / videosPerPage
  );

  // Starting video index
  const startIndex =
    (currentPage - 1) * videosPerPage;

  // Get only 10 videos for current page
  const currentVideos = videos.slice(
    startIndex,
    startIndex + videosPerPage
  );

  // When page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      <main className="videos-container">

        <div className="page-heading">
          <h1>English Videos</h1>

          <p>
            Watch our English videos
          </p>
        </div>

        {loading ? (
          <p>Loading videos...</p>
        ) : videos.length === 0 ? (
          <p>No English videos available.</p>
        ) : (
          <>
            <div className="video-grid">

              {currentVideos.map((video) => (

                <VideoCard
                  key={video._id}
                  video={{
                    id: video._id,

                    title: video.title,

                    description:
                      video.description,

                    thumbnail:
                      video.thumbnailUrl
                        ? `http://localhost:5000${video.thumbnailUrl}`
                        : "/images/video-thumbnail.jpg",

                    videoUrl:
                      `http://localhost:5000${video.videoUrl}`,

                    views: video.views,

                    likes: video.likes,

                    category: video.language,
                  }}
                />

              ))}

            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

      </main>
    </>
  );
}

export default EnglishVideos;

