import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { FiFilm } from "react-icons/fi";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  axios.get("https://movies-server-side.vercel.app/movies").then((data) => {
//     console.log(data.data);
    setMovies(data.data);
  });
  return (
    <div>
     Top Movies to Watch <FiFilm/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        {movies?.map((movie, idx) => (
          <MovieCard movie={movie} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
