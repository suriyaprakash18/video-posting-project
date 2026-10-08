// import React, {
//   useEffect,
//   useState
// } from "react";

// import { useNavigate } from "react-router-dom";

// function AdminDashboard() {

//   const navigate =
//     useNavigate();


//   const [videos, setVideos] =
//     useState([]);


//   const [showForm, setShowForm] =
//     useState(false);


//   const [editingId, setEditingId] =
//     useState(null);


//   const [form, setForm] =
//     useState({

//       title: "",

//       description: "",

//       category: "Tamil",

//       videoUrl:
//         "/videos/sample.mp4",

//       thumbnail:
//         "/images/video-thumbnail.jpg"

//     });


//   useEffect(() => {

//     const token =
//       localStorage.getItem(
//         "adminToken"
//       );


//     if (!token) {

//       navigate(
//         "/admin/login"
//       );

//       return;

//     }


//     const savedVideos =
//       JSON.parse(
//         localStorage.getItem(
//           "adminVideos"
//         )
//       ) || [];


//     setVideos(savedVideos);

//   }, [navigate]);


//   const handleLogout = () => {

//     localStorage.removeItem(
//       "adminToken"
//     );


//     navigate(
//       "/admin/login"
//     );

//   };


//   const handleChange = (e) => {

//     setForm({

//       ...form,

//       [e.target.name]:
//         e.target.value

//     });

//   };


//   const handleSubmit = (e) => {

//     e.preventDefault();


//     if (editingId) {

//       const updated =
//         videos.map(
//           (video) =>

//             video.id === editingId
//               ? {
//                   ...video,
//                   ...form
//                 }
//               : video
//         );


//       setVideos(updated);


//       localStorage.setItem(
//         "adminVideos",
//         JSON.stringify(updated)
//       );


//     } else {

//       const newVideo = {

//         id:
//           Date.now().toString(),

//         ...form,

//         views: 0,

//         likes: 0

//       };


//       const updated = [
//         ...videos,
//         newVideo
//       ];


//       setVideos(updated);


//       localStorage.setItem(
//         "adminVideos",
//         JSON.stringify(updated)
//       );

//     }


//     resetForm();

//   };


//   const resetForm = () => {

//     setForm({

//       title: "",

//       description: "",

//       category: "Tamil",

//       videoUrl:
//         "/videos/sample.mp4",

//       thumbnail:
//         "/images/video-thumbnail.jpg"

//     });


//     setEditingId(null);

//     setShowForm(false);

//   };


//   const handleEdit = (video) => {

//     setForm({

//       title: video.title,

//       description:
//         video.description,

//       category:
//         video.category,

//       videoUrl:
//         video.videoUrl,

//       thumbnail:
//         video.thumbnail

//     });


//     setEditingId(video.id);

//     setShowForm(true);

//   };


//   const handleDelete = (id) => {

//     const confirmDelete =
//       window.confirm(
//         "Are you sure you want to delete this video?"
//       );


//     if (!confirmDelete) {
//       return;
//     }


//     const updated =
//       videos.filter(
//         (video) =>
//           video.id !== id
//       );


//     setVideos(updated);


//     localStorage.setItem(
//       "adminVideos",
//       JSON.stringify(updated)
//     );

//   };


//   return (

//     <main className="admin-dashboard">

//       <header className="admin-dashboard-header">

//         <div>

//           <h1>
//             Admin Dashboard
//           </h1>

//           <p>
//             Manage your videos
//           </p>

//         </div>


//         <button
//           onClick={handleLogout}
//           className="logout-button"
//         >
//           Logout
//         </button>

//       </header>


//       <section className="admin-controls">

//         <button
//           className="add-video-button"
//           onClick={() =>
//             setShowForm(!showForm)
//           }
//         >
//           + Add Video
//         </button>

//       </section>


//       {showForm && (

//         <form
//           className="video-form"
//           onSubmit={handleSubmit}
//         >

//           <h2>
//             {editingId
//               ? "Edit Video"
//               : "Add New Video"}
//           </h2>


//           <label>
//             Video Title
//           </label>

//           <input
//             type="text"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="Enter video title"
//             required
//           />


//           <label>
//             Description
//           </label>

//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Enter description"
//             required
//           />


//           <label>
//             Category
//           </label>

//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//           >

//             <option value="Tamil">
//               Tamil
//             </option>

//             <option value="English">
//               English
//             </option>

//           </select>


//           <label>
//             Video URL
//           </label>

//           <input
//             type="text"
//             name="videoUrl"
//             value={form.videoUrl}
//             onChange={handleChange}
//             placeholder="/videos/sample.mp4"
//             required
//           />


//           <label>
//             Thumbnail URL
//           </label>

//           <input
//             type="text"
//             name="thumbnail"
//             value={form.thumbnail}
//             onChange={handleChange}
//             placeholder="/images/video-thumbnail.jpg"
//             required
//           />


//           <div className="form-buttons">

//             <button
//               type="submit"
//               className="save-button"
//             >
//               {editingId
//                 ? "Update Video"
//                 : "Add Video"}
//             </button>


//             <button
//               type="button"
//               onClick={resetForm}
//               className="cancel-button"
//             >
//               Cancel
//             </button>

//           </div>

//         </form>

//       )}


//       <section className="admin-video-section">

//         <h2>
//           Videos ({videos.length})
//         </h2>


//         {videos.length === 0 ? (

//           <div className="no-admin-videos">

//             <p>
//               No videos added yet.
//             </p>

//           </div>

//         ) : (

//           <div className="admin-video-list">

//             {videos.map(
//               (video) => (

//                 <div
//                   className="admin-video-card"
//                   key={video.id}
//                 >

//                   <img
//                     src={video.thumbnail}
//                     alt={video.title}
//                   />


//                   <div className="admin-video-info">

//                     <span className="category-badge">
//                       {video.category}
//                     </span>

//                     <h3>
//                       {video.title}
//                     </h3>

//                     <p>
//                       {video.description}
//                     </p>


//                     <div className="admin-actions">

//                       <button
//                         onClick={() =>
//                           handleEdit(video)
//                         }
//                         className="edit-button"
//                       >
//                         Edit
//                       </button>


//                       <button
//                         onClick={() =>
//                           handleDelete(
//                             video.id
//                           )
//                         }
//                         className="delete-button"
//                       >
//                         Delete
//                       </button>

//                     </div>

//                   </div>

//                 </div>

//               )
//             )}

//           </div>

//         )}

//       </section>

//     </main>

//   );
// }

// export default AdminDashboard;

















import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000";

  const [videos, setVideos] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    language: "Tamil",
  });

  const [videoFile, setVideoFile] = useState(null);

  const [thumbnailFile, setThumbnailFile] =
    useState(null);


  // ==============================
  // GET ADMIN TOKEN
  // ==============================

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };


  // ==============================
  // FETCH ALL VIDEOS
  // ==============================

  const fetchVideos = async () => {
    try {
      setError("");

      const response = await fetch(
        `${API_URL}/api/videos`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch videos"
        );
      }

      setVideos(data);

    } catch (error) {
      console.error(
        "Fetch videos error:",
        error
      );

      setError(
        "Unable to load videos from server."
      );
    }
  };


  // ==============================
  // PAGE LOAD
  // ==============================

  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchVideos();
  }, [navigate]);


  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    localStorage.removeItem("adminEmail");

    navigate("/admin/login");
  };


  // ==============================
  // INPUT CHANGE
  // ==============================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setMessage("");
    setError("");
  };


  // ==============================
  // VIDEO FILE CHANGE
  // ==============================

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setVideoFile(file);

    setMessage("");
    setError("");
  };


  // ==============================
  // THUMBNAIL FILE CHANGE
  // ==============================

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setThumbnailFile(file);

    setMessage("");
    setError("");
  };


  // ==============================
  // ADD VIDEO
  // ==============================

  const handleAddVideo = async (e) => {
    e.preventDefault();

    setLoading(true);

    setMessage("");

    setError("");

    try {
      const token = getToken();

      if (!token) {
        navigate("/admin/login");
        return;
      }

      if (!videoFile) {
        setError("Please select a video file.");
        setLoading(false);
        return;
      }

      const formData = new FormData();

      formData.append(
        "title",
        form.title
      );

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "language",
        form.language
      );

      formData.append(
        "video",
        videoFile
      );

      if (thumbnailFile) {
        formData.append(
          "thumbnail",
          thumbnailFile
        );
      }


      const response = await fetch(
        `${API_URL}/api/videos`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );


      const data = await response.json();


      if (!response.ok) {

        if (response.status === 401) {
          localStorage.removeItem(
            "adminToken"
          );

          navigate("/admin/login");

          return;
        }

        throw new Error(
          data.message ||
            "Failed to upload video"
        );
      }


      setMessage(
        "Video uploaded successfully!"
      );


      resetForm();


      await fetchVideos();

    } catch (error) {

      console.error(
        "Add video error:",
        error
      );

      setError(
        error.message ||
          "Failed to upload video."
      );

    } finally {

      setLoading(false);
    }
  };


  // ==============================
  // EDIT VIDEO
  // ==============================

  const handleEdit = (video) => {

    setForm({
      title: video.title || "",

      description:
        video.description || "",

      language:
        video.language || "Tamil",
    });

    setEditingId(video._id);

    setVideoFile(null);

    setThumbnailFile(null);

    setShowForm(true);

    setMessage("");

    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // ==============================
  // UPDATE VIDEO
  // ==============================

  const handleUpdateVideo = async (e) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    setError("");

    try {

      const token = getToken();

      if (!token) {
        navigate("/admin/login");
        return;
      }


      /*
        For now, Edit updates:

        title
        description
        language

        The uploaded video and thumbnail
        remain unchanged.
      */

      const response = await fetch(
        `${API_URL}/api/videos/${editingId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: form.title,

            description:
              form.description,

            language:
              form.language,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        if (response.status === 401) {

          localStorage.removeItem(
            "adminToken"
          );

          navigate("/admin/login");

          return;
        }

        throw new Error(
          data.message ||
            "Failed to update video"
        );
      }


      setMessage(
        "Video updated successfully!"
      );


      resetForm();


      await fetchVideos();

    } catch (error) {

      console.error(
        "Update video error:",
        error
      );

      setError(
        error.message ||
          "Failed to update video."
      );

    } finally {

      setLoading(false);
    }
  };


  // ==============================
  // DELETE VIDEO
  // ==============================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this video?"
      );


    if (!confirmDelete) {
      return;
    }


    setLoading(true);

    setMessage("");

    setError("");


    try {

      const token = getToken();


      if (!token) {

        navigate("/admin/login");

        return;
      }


      const response = await fetch(
        `${API_URL}/api/videos/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        if (response.status === 401) {

          localStorage.removeItem(
            "adminToken"
          );

          navigate("/admin/login");

          return;
        }


        throw new Error(
          data.message ||
            "Failed to delete video"
        );
      }


      setMessage(
        "Video deleted successfully!"
      );


      await fetchVideos();

    } catch (error) {

      console.error(
        "Delete video error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete video."
      );

    } finally {

      setLoading(false);
    }
  };


  // ==============================
  // RESET FORM
  // ==============================

  const resetForm = () => {

    setForm({
      title: "",
      description: "",
      language: "Tamil",
    });


    setVideoFile(null);

    setThumbnailFile(null);

    setEditingId(null);

    setShowForm(false);


    /*
      Reset file inputs.
      This makes selecting the same
      file again possible.
    */

    const videoInput =
      document.getElementById(
        "video-file"
      );

    const thumbnailInput =
      document.getElementById(
        "thumbnail-file"
      );


    if (videoInput) {
      videoInput.value = "";
    }


    if (thumbnailInput) {
      thumbnailInput.value = "";
    }
  };


  // ==============================
  // IMAGE URL
  // ==============================

  const getThumbnailUrl = (video) => {

    if (!video.thumbnailUrl) {

      return "/images/video-thumbnail.jpg";
    }


    return `${API_URL}${video.thumbnailUrl}`;
  };


  // ==============================
  // VIDEO URL
  // ==============================

  const getVideoUrl = (video) => {

    if (!video.videoUrl) {
      return "";
    }


    return `${API_URL}${video.videoUrl}`;
  };


  // ==============================
  // JSX
  // ==============================

  return (
    <main className="admin-dashboard">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <header className="admin-dashboard-header">

        <div>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage your videos
          </p>

        </div>


        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>

      </header>


      {/* ========================= */}
      {/* MESSAGE */}
      {/* ========================= */}

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}


      {error && (
        <div className="login-error">
          {error}
        </div>
      )}


      {/* ========================= */}
      {/* ADD VIDEO BUTTON */}
      {/* ========================= */}

      <section className="admin-controls">

        <button
          className="add-video-button"
          onClick={() => {

            setShowForm(!showForm);

            setEditingId(null);

            setMessage("");

            setError("");

          }}
        >

          {showForm
            ? "Close Form"
            : "+ Add Video"}

        </button>

      </section>


      {/* ========================= */}
      {/* FORM */}
      {/* ========================= */}

      {showForm && (

        <form
          className="video-form"
          onSubmit={
            editingId
              ? handleUpdateVideo
              : handleAddVideo
          }
        >

          <h2>

            {editingId
              ? "Edit Video"
              : "Add New Video"}

          </h2>


          {/* TITLE */}

          <label>
            Video Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter video title"
            required
          />


          {/* DESCRIPTION */}

          <label>
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter video description"
            required
          />


          {/* LANGUAGE */}

          <label>
            Language
          </label>

          <select
            name="language"
            value={form.language}
            onChange={handleChange}
          >

            <option value="Tamil">
              Tamil
            </option>

            <option value="English">
              English
            </option>

          </select>


          {/* VIDEO FILE */}

          {!editingId && (

            <>
              <label>
                Video File
              </label>

              <input
                id="video-file"
                type="file"
                accept="video/*"
                onChange={
                  handleVideoFileChange
                }
                required
              />

              {videoFile && (
                <p>
                  Selected video:{" "}
                  <strong>
                    {videoFile.name}
                  </strong>
                </p>
              )}
            </>

          )}


          {/* THUMBNAIL FILE */}

          {!editingId && (

            <>
              <label>
                Thumbnail Image
              </label>

              <input
                id="thumbnail-file"
                type="file"
                accept="image/*"
                onChange={
                  handleThumbnailChange
                }
              />

              {thumbnailFile && (
                <p>
                  Selected thumbnail:{" "}
                  <strong>
                    {thumbnailFile.name}
                  </strong>
                </p>
              )}
            </>

          )}


          {/* EDIT INFO */}

          {editingId && (

            <div className="edit-info">

              <p>
                You are editing an existing
                video.
              </p>

              <p>
                The current video file and
                thumbnail will remain unchanged.
              </p>

            </div>

          )}


          {/* BUTTONS */}

          <div className="form-buttons">

            <button
              type="submit"
              className="save-button"
              disabled={loading}
            >

              {loading
                ? "Please wait..."
                : editingId
                ? "Update Video"
                : "Upload Video"}

            </button>


            <button
              type="button"
              onClick={resetForm}
              className="cancel-button"
              disabled={loading}
            >
              Cancel
            </button>

          </div>

        </form>

      )}


      {/* ========================= */}
      {/* VIDEO LIST */}
      {/* ========================= */}

      <section className="admin-video-section">

        <h2>
          Videos ({videos.length})
        </h2>


        {videos.length === 0 ? (

          <div className="no-admin-videos">

            <p>
              No videos added yet.
            </p>

          </div>

        ) : (

          <div className="admin-video-list">

            {videos.map((video) => (

              <div
                className="admin-video-card"
                key={video._id}
              >

                {/* THUMBNAIL */}

                <img
                  src={getThumbnailUrl(video)}
                  alt={video.title}
                />


                <div className="admin-video-info">

                  {/* LANGUAGE */}

                  <span className="category-badge">

                    {video.language}

                  </span>


                  {/* TITLE */}

                  <h3>
                    {video.title}
                  </h3>


                  {/* DESCRIPTION */}

                  <p>
                    {video.description}
                  </p>


                  {/* VIDEO INFORMATION */}

                  <div className="admin-video-stats">

                    <span>
                      👁 {video.views || 0}
                    </span>

                    <span>
                      ❤️ {video.likes || 0}
                    </span>

                  </div>


                  {/* VIDEO FILE */}

                  <p className="admin-file-info">

                    Video:
                    {" "}

                    <a
                      href={getVideoUrl(video)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open Video
                    </a>

                  </p>


                  {/* ACTIONS */}

                  <div className="admin-actions">

                    <button
                      onClick={() =>
                        handleEdit(video)
                      }
                      className="edit-button"
                      disabled={loading}
                    >
                      Edit
                    </button>


                    <button
                      onClick={() =>
                        handleDelete(
                          video._id
                        )
                      }
                      className="delete-button"
                      disabled={loading}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default AdminDashboard;

