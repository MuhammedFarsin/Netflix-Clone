import React, { useEffect, useState } from "react";
import { API_KEY, imageURL } from "../../constants/constants";
import axios from "../../axios";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState(null); // Initialize movie state to null

  useEffect(() => {
    axios
      .get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        const movies = res.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        console.log(randomMovie);
        setMovie(randomMovie);
      });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${movie ? imageURL + movie.backdrop_path : ""})`,
      }}
      className="banner"
    >
      <div className="content">
        <h1 className="title">{movie ? movie.title : ""}</h1>
        <div className="banner_buttons">
          <button className="button">Play</button>
          <button className="button">My list</button>
        </div>
        <h1 className="description">{movie ? movie.overview : ""}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
