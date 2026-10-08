// import React from "react";
// import { Link } from "react-router-dom";

// function VideoCard({ video }) {

//   return (

//     <div className="video-card">

//       <Link to={`/video/${video.id}`}>

//         <img
//           src={video.thumbnail}
//           alt={video.title}
//           className="video-thumbnail"
//         />

//       </Link>

//       <div className="video-content">

//         <h3>
//           {video.title}
//         </h3>

//         <p>
//           {video.description}
//         </p>

//         <div className="video-meta">

//           <span>
//             {video.views} views
//           </span>

//           <span>
//             ❤️ {video.likes}
//           </span>

//         </div>

//       </div>

//     </div>

//   );
// }

// export default VideoCard;




import React from "react";
import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <div className="video-card">

      {/* Thumbnail */}

      <Link to={`/video/${video.id}`}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="video-thumbnail"
        />
      </Link>

      {/* Video Content */}

      <div className="video-content">

        <h3>
          {video.title}
        </h3>

        <p>
          {video.description}
        </p>

        {/* Video Meta */}

        <div className="video-meta">

          <span>
            👁 {video.views || 0} views
          </span>

          <span>
            ❤️ {video.likes || 0}
          </span>

        </div>

        {/* Watch Button */}

        <Link
          to={`/video/${video.id}`}
          className="watch-button"
        >
          Watch Video
        </Link>

      </div>

    </div>
  );
}

export default VideoCard;
