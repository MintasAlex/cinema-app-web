import "./Showing.css";
import MovieShowing from "./MovieShowing";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../../services/auth-service";
import MovieService from "../../services/movies-service";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import movieGenreService from "../../services/movie-genres-service.js";

export default function Showing() {
  const [movies, setMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [open, setOpen] = useState(false);

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

  const getMovieGenres = async () =>
    await movieGenreService.getAllMovieGenres().then(
      (response) => {
        setMovieGenres(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

  const getGenres = async () =>
    await movieGenreService.getAllGenres().then(
      (response) => {
        setGenres(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

  function getMovieGenreByGenreName(genreName) {
    movieGenreService.getMovieGenreByGenreName(genreName).then(
      (response) => {
        console.log(response.data);
        return response.data;
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  useEffect(() => {
    getMovies();
    getMovieGenres();
    getGenres();
  }, []);

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearchQuery(lowerCase);
  };

  const filteredMovies = movies.filter((movie) => {
    if (searchQuery === "") return movie;
    else {
      return movie.title.toLowerCase().includes(searchQuery);
    }
  });

  const filteredMoviesByGenre = filteredMovies.filter((movie) => {
    if (searchGenre === "") return movie;
    else {
        return movieGenres.some(
          (movieGenre) =>
            movieGenre.movieId === movie.id &&
            movieGenre.genreName === searchGenre
        ); 
    }
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    setSearchGenre(e.target.value);
  };

  return (
    <div id="showing-page-container">
      <div id="movie-showing-container">
        <h1>Now Showing</h1>
        <div id="search-bar-container">
          <TextField
            id="search-bar-input"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
            style={{ width: "70%", marginRight: "2%" }}
          />
          <FormControl style={{ width: "25%" }}>
            <InputLabel id="genre-select-label">Genre</InputLabel>
            <Select
              labelId="genre-select-label"
              id="genre-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={searchGenre}
              label="Genre"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {genres.map((genre, index) => (
                <MenuItem key={index} value={genre.name}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div id="movies-container">
          {filteredMoviesByGenre.map((movie) => (
            <MovieShowing key={movie.id} movie={movie}></MovieShowing>
          ))}
        </div>
      </div>
    </div>
  );
}
