// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import Navbar from "../components/Navbar";

// function Downloads() {

//   const [downloads, setDownloads] =
//     useState([]);


//   useEffect(() => {

//     const savedDownloads =
//       JSON.parse(
//         localStorage.getItem(
//           "downloads"
//         )
//       ) || [];

//     setDownloads(
//       savedDownloads
//     );

//   }, []);


//   const removeDownload = (id) => {

//     const updated =
//       downloads.filter(
//         (video) =>
//           video.id !== id
//       );


//     setDownloads(updated);


//     localStorage.setItem(
//       "downloads",
//       JSON.stringify(updated)
//     );

//   };


//   const clearDownloads = () => {

//     setDownloads([]);

//     localStorage.removeItem(
//       "downloads"
//     );

//   };


//   return (

//     <>
//       <Navbar />

//       <main className="downloads-container">

//         <div className="downloads-header">

//           <div>

//             <h1>
//               My Downloads
//             </h1>

//             <p>
//               Videos you have downloaded
//             </p>

//           </div>


//           {downloads.length > 0 && (

//             <button
//               className="clear-button"
//               onClick={clearDownloads}
//             >
//               Clear All
//             </button>

//           )}

//         </div>


//         {downloads.length === 0 ? (

//           <div className="empty-downloads">

//             <h2>
//               No Downloads Yet
//             </h2>

//             <p>
//               Download a video and
//               it will appear here.
//             </p>

//             <Link
//               to="/tamil"
//               className="browse-button"
//             >
//               Browse Videos
//             </Link>

//           </div>

//         ) : (

//           <div className="download-list">

//             {downloads.map(
//               (video) => (

//                 <div
//                   className="download-card"
//                   key={video.id}
//                 >

//                   <img
//                     src={video.thumbnail}
//                     alt={video.title}
//                   />


//                   <div className="download-info">

//                     <h3>
//                       {video.title}
//                     </h3>

//                     <p>
//                       {video.description}
//                     </p>

//                     <small>
//                       Downloaded:
//                       {" "}
//                       {video.downloadedAt}
//                     </small>


//                     <div className="download-card-actions">

//                       <Link
//                         to={`/video/${video.id}`}
//                         className="watch-button"
//                       >
//                         Watch
//                       </Link>


//                       <a
//                         href={video.videoUrl}
//                         download
//                         className="download-again"
//                       >
//                         Download Again
//                       </a>


//                       <button
//                         onClick={() =>
//                           removeDownload(
//                             video.id
//                           )
//                         }
//                         className="remove-button"
//                       >
//                         Remove
//                       </button>

//                     </div>

//                   </div>

//                 </div>

//               )
//             )}

//           </div>

//         )}

//       </main>

//     </>

//   );
// }

// export default Downloads;








import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

function Downloads() {
  const [downloads, setDownloads] = useState([]);

  // Load downloaded videos
  useEffect(() => {
    const savedDownloads =
      JSON.parse(
        localStorage.getItem("downloads")
      ) || [];

    setDownloads(savedDownloads);
  }, []);

  // Remove one video
  const removeDownload = (id) => {
    const updated = downloads.filter(
      (video) => video.id !== id
    );

    setDownloads(updated);

    localStorage.setItem(
      "downloads",
      JSON.stringify(updated)
    );
  };

  // Remove all videos
  const clearDownloads = () => {
    setDownloads([]);

    localStorage.removeItem("downloads");
  };

  return (
    <>
      <Navbar />

      <main className="downloads-container">

        {/* Header */}
        <div className="downloads-header">

          <div>
            <h1>My Downloads</h1>

            <p>
              Videos you have downloaded
            </p>
          </div>

          {/* Clear All */}
          {downloads.length > 0 && (
            <button
              className="clear-button"
              onClick={clearDownloads}
            >
              Clear All
            </button>
          )}

        </div>

        {/* No Downloads */}
        {downloads.length === 0 ? (

          <div className="empty-downloads">

            <h2>
              No Downloads Yet
            </h2>

            <p>
              Download a video and it will
              appear here.
            </p>

            <Link
              to="/tamil"
              className="browse-button"
            >
              Browse Videos
            </Link>

          </div>

        ) : (

          /* Download List */
          <div className="download-list">

            {downloads.map((video) => (

              <div
                className="download-card"
                key={video.id}
              >

                {/* Thumbnail */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="download-thumbnail"
                />

                {/* Video Information */}
                <div className="download-info">

                  <h3>
                    {video.title}
                  </h3>

                  <p>
                    {video.description}
                  </p>

                  <small>
                    Downloaded:{" "}
                    {video.downloadedAt}
                  </small>

                  {/* Buttons */}
                  <div className="download-card-actions">

                    {/* Watch */}
                    <Link
                      to={`/video/${video.id}`}
                      className="watch-button"
                    >
                      Watch
                    </Link>

                    {/* Download Again */}
                    <a
                      href={video.videoUrl}
                      download
                      className="download-again"
                    >
                      Download Again
                    </a>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeDownload(video.id)
                      }
                      className="remove-button"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>
    </>
  );
}

export default Downloads;

