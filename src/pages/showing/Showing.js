import "./Showing.css";
import MovieShowing from "./MovieShowing";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../../services/auth-service";
import MovieService from "../../services/movies-service";

export default function Showing() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const getMovies = async () =>
    await MovieService.getAllMovies().then(
      (response) => {
        setMovies(response.data);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          AuthService.logout();
          navigate("/");
          window.location.reload();
        }
      }
    );

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div id="showing-page-container">
      <div id="movie-showing-container">
        <h1>Now Showing</h1>
        <div id="movies">
          {movies.map((movie) => (
            <MovieShowing key={movie.id} movie={movie}></MovieShowing>
          ))}
        </div>
      </div>
    </div>
  );
}
