import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {

  return (

    <>
      <Navbar />

      <main className="home-container">

        <section className="hero-section">

          <h1>
            Welcome to MyVideos
          </h1>

          <p>
            Watch Tamil and English videos
          </p>

        </section>


        <h2 className="section-title">
          Video Categories
        </h2>


        <div className="category-grid">

          <Link
            to="/tamil"
            className="category-card"
          >

            <img
              src="/images/tamil.jpg"
              alt="Tamil Videos"
            />

            <div className="category-content">

              <h2>
                Tamil Videos
              </h2>

              <p>
                Watch Tamil videos
              </p>

            </div>

          </Link>


          <Link
            to="/english"
            className="category-card"
          >

            <img
              src="/images/english.jpg"
              alt="English Videos"
            />

            <div className="category-content">

              <h2>
                English Videos
              </h2>

              <p>
                Watch English videos
              </p>

            </div>

          </Link>

        </div>

      </main>

    </>

  );
}

export default Home;