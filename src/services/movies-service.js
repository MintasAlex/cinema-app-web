import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getAllMovies = async () => {
  return await axios.get(API_URL + "/movies", { headers: authHeader() });
};

const getMovie = (id) => {
  return axios.get(API_URL + `/movies/${id}`, { headers: authHeader() });
};

const movieService = {
  getAllMovies,
  getMovie,
};

export default movieService;
