import "./MovieShowing.css";
import { useState, useEffect } from "react";
import movieGenreService from "../../services/movie-genres-service.js";
import movieActorService from "../../services/movie-actors-service";
import movieDirectorService from "../../services/movie-directors-service";
import { useNavigate } from "react-router-dom";

export default function MovieShowing({ movie }) {
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieActors, setMovieActors] = useState([]);
  const [movieDirectors, setMovieDirectors] = useState([]);

  const navigate = useNavigate();

  const getMovieGenres = async () =>
    await movieGenreService.getMovieGenreByMovieId(movie.id).then(
      (response) => {
        setMovieGenres(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

  const getMovieActors = async () =>
    await movieActorService.getMovieActorByMovieId(movie.id).then(
      (response) => {
        setMovieActors(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

  const getMovieDirectors = async () =>
    await movieDirectorService.getMovieDirectorByMovieId(movie.id).then(
      (response) => {
        setMovieDirectors(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

  useEffect(() => {
    getMovieGenres();
    getMovieActors();
    getMovieDirectors();
  }, []);

  const handleMovieClick = () => {
    navigate("/movie/" + movie.id);
  };

  return (
    <>
      <div className="movie-container" onClick={handleMovieClick}>
        <div id="poster-container">
          <img
            id="poster"
            src="https://upload.wikimedia.org/wikipedia/en/3/30/Ant-Man_and_the_Wasp_Quantumania_poster.jpg"
            alt={movie.title + " poster"}
          />
        </div>
        <div id="movie-info-container">
          <h2 id="movie-title">{movie.title}</h2>
          <p id="movie-genres">
            {movieGenres.map((movieGenre, index) => (
              <span key={index}>
                {index > 0 && ", "}
                {movieGenre.genre.name}
              </span>
            ))}
          </p>
          <p id="movie-runtime">Runtime: {movie.runtimeMinutes}min</p>
          <p id="movie-score">Score: {movie.score}</p>
          <p id="movie-rating">{movie.rating}</p>
          <p id="movie-actors"><b>Actors:</b> {movieActors.map((movieActor, index) => (
              <span key={index}>
                {index > 0 && ", "}
                {movieActor.name}
              </span>
          ))}</p>
          <p id="movie-directors"><b>Directors:</b> {movieDirectors.map((movieDirector, index) => (
              <span key={index}>
                {index > 0 && ", "}
                {movieDirector.name}
              </span>
          ))}</p>
        </div>
      </div>
    </>
  );
}
