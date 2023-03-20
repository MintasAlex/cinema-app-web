import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../../services/auth-service";
import MovieService from "../../services/movies-service";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";
import placeHolderPoster from "../../components/posters/poster-placeholder.jpg";
import movieGenreService from "../../services/movie-genres-service.js";
import movieActorService from "../../services/movie-actors-service";
import movieDirectorService from "../../services/movie-directors-service";
import screeningService from "../../services/screening-service";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "react-router-dom";

export default function MovieDetails() {
  const URL = "http://localhost:3000/";

  const { id } = useParams();

  const [movieGenres, setMovieGenres] = useState([]);
  const [movieActors, setMovieActors] = useState([]);
  const [movieDirectors, setMovieDirectors] = useState([]);
  let date = new Date();

  const [screenings, setScreenings] = useState([]);

  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  const getMovie = async (id) =>
    await MovieService.getMovie(id).then(
      (response) => {
        setMovie(response.data);
      },
      (error) => {
        if (error.response && error.response.status === 404) {
          navigate("/NotFound");
        } else if (error.response && error.response.status === 401) {
          AuthService.logout();
          navigate("/");
          window.location.reload();
        }
      }
    );

  const getMovieGenres = async () =>
    await movieGenreService.getMovieGenreByMovieId(id).then(
      (response) => {
        setMovieGenres(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

  const getMovieActors = async () =>
    await movieActorService.getMovieActorByMovieId(id).then(
      (response) => {
        setMovieActors(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

  const getMovieDirectors = async () =>
    await movieDirectorService.getMovieDirectorByMovieId(id).then(
      (response) => {
        setMovieDirectors(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

  const getScreeningsByMovieId = async () =>
    await screeningService.getScreeningsByMovieId(id).then(
      (response) => {
        setScreenings(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

  useEffect(() => {
    getMovie(id);
    getMovieGenres();
    getMovieActors();
    getMovieDirectors();
    getScreeningsByMovieId();
  }, []);

  const timestampToDate = (timestamp) => {
    let date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const timestampToTime = (timestamp) => {
    let date = new Date(timestamp);
    return date.toLocaleTimeString();
  };


  return (
    <>
      <div id="movie-details-page-container">
        <div id="movie-details-container">
          {movie &&
            movieActors.length > 0 &&
            movieDirectors.length > 0 &&
            movieGenres.length > 0 && (
              <div id="movie-details-render-container">
                <div id="movie-poster-container">
                  <img
                    id="poster"
                    src={
                      movie.picturePath !== null
                        ? URL + movie.picturePath
                        : placeHolderPoster
                    }
                    alt="poster"
                  />
                </div>
                <div id="movie-info-container">
                  <h1>{movie.title}</h1>
                  <p id="movie-genres">
                    <b>Genres:</b>{" "}
                    {movieGenres.map((movieGenre, index) => (
                      <span key={index}>
                        {index > 0 && ", "}
                        {movieGenre.genre.name}
                      </span>
                    ))}
                  </p>
                  <p>
                    <b>Runtime: </b>
                    {movie.runtimeMinutes}min
                  </p>
                  <p>
                    <b>Score: </b>
                    {movie.score}
                  </p>
                  <p>
                    <b>Rating: </b>
                    {movie.rating}
                  </p>
                  <p id="movie-actors">
                    <b>Actors:</b>{" "}
                    {movie &&
                      movieActors.map((movieActor, index) => (
                        <span key={index}>
                          {index > 0 && ", "}
                          {movieActor.name}
                        </span>
                      ))}
                  </p>
                  <p id="movie-directors">
                    <b>Directors:</b>{" "}
                    {movie &&
                      movieDirectors.map((movieDirector, index) => (
                        <span key={index}>
                          {index > 0 && ", "}
                          {movieDirector.name}
                        </span>
                      ))}
                  </p>
                  <p>
                    <b>Description: </b> {movie && movie.description}
                  </p>
                </div>
              </div>
            )}
          <div id="movie-screenign-container">
            <h2>Screenings</h2>
            <div id="movie-screening-list-container">
              <List id="screenings-list">
                {movie &&
                  screenings.map((screening, index) => (
                    <ListItem className="screening-list-item" key={index} component={Link} to = {"/screening/"+screening.id}>
                      <ListItemText
                        primary={timestampToDate(screening.startTimestamp)}
                      />
                      <ListItemText
                        primary={timestampToTime(screening.startTimestamp)}
                      />
                    </ListItem>
                  ))}
              </List>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
