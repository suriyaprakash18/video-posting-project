// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route
// } from "react-router-dom";

// import Home from "./pages/Home";
// import TamilVideos from "./pages/TamilVideos";
// import EnglishVideos from "./pages/EnglishVideos";
// import VideoDetails from "./pages/VideoDetails";
// import Downloads from "./pages/Downloads";

// import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";

// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>

//       <Routes>

//         {/* PUBLIC USER PAGES */}

//         <Route
//           path="/"
//           element={<Home />}
//         />

//         <Route
//           path="/tamil"
//           element={<TamilVideos />}
//         />

//         <Route
//           path="/english"
//           element={<EnglishVideos />}
//         />

//         <Route
//           path="/video/:id"
//           element={<VideoDetails />}
//         />

//         <Route
//           path="/downloads"
//           element={<Downloads />}
//         />


//         {/* ADMIN LOGIN */}

//         <Route
//           path="/admin/login"
//           element={<AdminLogin />}
//         />


//         {/* PROTECTED ADMIN */}

//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>

//     </BrowserRouter>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TamilVideos from "./pages/TamilVideos";
import EnglishVideos from "./pages/EnglishVideos";
import VideoDetails from "./pages/VideoDetails";
import Downloads from "./pages/Downloads";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/tamil"
          element={<TamilVideos />}
        />

        <Route
          path="/english"
          element={<EnglishVideos />}
        />

        <Route
          path="/video/:id"
          element={<VideoDetails />}
        />

        <Route
          path="/downloads"
          element={<Downloads />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

