import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getAllMovieGenres = async () => {
  return await axios.get(API_URL + "/movie-genres", { headers: authHeader() });
};

const getMovieGenreByMovieId = async (id) => {
  return await axios.get(API_URL + `/movie-genres/movie/${id}`, {
    headers: authHeader(),
  });
};

const getMovieGenreByGenreName = async (name) => {
  return await axios.get(API_URL + `/movie-genres/genre/${name}`, {
    headers: authHeader(),
  });
};

const getAllGenres = async () => {
  return await axios.get(API_URL + "/genres", { headers: authHeader() });
};

const movieGenreService = {
  getAllMovieGenres,
  getMovieGenreByMovieId,
  getMovieGenreByGenreName,
  getAllGenres,
};

export default movieGenreService;
