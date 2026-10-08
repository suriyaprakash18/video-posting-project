import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav  className="navbar">

      <div className="logo">
        <Link to="/">
          MyVideos
        </Link>
      </div>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/tamil">
          Tamil
        </Link>

        <Link to="/english">
          English
        </Link>

        <Link to="/downloads">
          Downloads
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;