import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";
import axios from "../../axios";
import { imageURL, API_KEY } from "../../constants/constants";
import "./RowPost.css";

function RowPost({ title, isSmall, url }) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setMovies(res.data.results);
      })
      .catch((error) => {
        alert("Network Error");
      });
  }, [url]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    console.log(id);
    axios
      .get(`movie/${id}/videos?language=en-US&api_key=${API_KEY}`) // Corrected API key usage
      .then((res) => {
        console.log(res.data);
        if (res.data.results.length) {
          setUrlId(res.data.results[0].key);
        }
      })
      .catch((error) => {
        console.error("Error fetching movie videos:", error);
      });
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            key={obj.id} // Add unique key
            onClick={() => handleMovie(obj.id)}
            className={isSmall ? "smallPoster" : "poster"}
            alt="poster"
            src={`${imageURL + obj.backdrop_path}`}
          />
        ))}
      </div>
      {urlId && <Youtube videoId={urlId} opts={opts} />}
    </div>
  );
}

export default RowPost;
