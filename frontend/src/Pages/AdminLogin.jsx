// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AdminLogin() {

//   const navigate =
//     useNavigate();


//   const [email, setEmail] =
//     useState("");


//   const [password, setPassword] =
//     useState("");


//   const [error, setError] =
//     useState("");


//   const handleSubmit = (e) => {

//     e.preventDefault();


//     setError("");


//     // TEMPORARY LOGIN
//     // Backend authentication
//     // will replace this later.

//     if (
//       email === "admin@gmail.com" &&
//       password === "123456"
//     ) {

//       localStorage.setItem(
//         "adminToken",
//         "temporary-admin-token"
//       );


//       navigate(
//         "/admin/dashboard"
//       );

//     } else {

//       setError(
//         "Invalid email or password"
//       );

//     }

//   };


//   return (

//     <main className="admin-login-page">

//       <form
//         className="admin-login-box"
//         onSubmit={handleSubmit}
//       >

//         <div className="admin-icon">
//           🔐
//         </div>


//         <h1>
//           Admin Login
//         </h1>


//         <p className="admin-login-subtitle">
//           Only administrators can access
//           the dashboard.
//         </p>


//         {error && (

//           <div className="login-error">
//             {error}
//           </div>

//         )}


//         <label>
//           Email
//         </label>

//         <input
//           type="email"
//           placeholder="Enter admin email"
//           value={email}
//           onChange={(e) =>
//             setEmail(e.target.value)
//           }
//           required
//         />


//         <label>
//           Password
//         </label>

//         <input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) =>
//             setPassword(e.target.value)
//           }
//           required
//         />


//         <button
//           type="submit"
//           className="admin-login-button"
//         >
//           Login
//         </button>


//         <p className="demo-login">
//           Demo: admin@gmail.com / 123456
//         </p>

//       </form>

//     </main>

//   );
// }

// export default AdminLogin;






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ================================
  // LOGIN
  // ================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      // Backend error
      if (!response.ok) {
        setError(
          data.message || "Invalid email or password"
        );

        return;
      }

      // Save JWT token
      localStorage.setItem(
        "adminToken",
        data.token
      );

      // Optional: save admin email
      localStorage.setItem(
        "adminEmail",
        data.admin.email
      );

      // Go to dashboard
      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to server. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // ================================
  // FORGOT PASSWORD
  // ================================

  const handleForgotPassword = () => {
    navigate("/admin/forgot-password");
  };

  return (
    <main className="admin-login-page">

      <form
        className="admin-login-box"
        onSubmit={handleSubmit}
      >

        {/* Icon */}

        <div className="admin-icon">
          🔐
        </div>

        {/* Heading */}

        <h1>
          Admin Login
        </h1>

        <p className="admin-login-subtitle">
          Only administrators can access
          the dashboard.
        </p>

        {/* Error */}

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        {/* Email */}

        <label htmlFor="admin-email">
          Email
        </label>

        <input
          id="admin-email"
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          autoComplete="username"
          required
        />

        {/* Password */}

        <label htmlFor="admin-password">
          Password
        </label>

        <input
          id="admin-password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          autoComplete="current-password"
          required
        />

        {/* Forgot Password */}

        <button
          type="button"
          className="forgot-password-button"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </button>

        {/* Login */}

        <button
          type="submit"
          className="admin-login-button"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

      </form>

    </main>
  );
}

export default AdminLogin;

