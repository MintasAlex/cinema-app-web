import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getAllMovies = async () => {
  return await axios.get(API_URL + "/movies", { headers: authHeader() });
};

const getMovie = async (id) => {
  return await axios.get(API_URL + `/movies/${id}`, { headers: authHeader() });
};

const addMovie = async (data) => {
  return await axios.post(API_URL + "/movies", data, { headers: authHeader() });
};

const updateMovie = async (id, data) => {
  return await axios.put(API_URL + `/movies/${id}`, data, {
    headers: authHeader(),
  });
};

const deleteMovie = async (id) => {
  return await axios.delete(API_URL + `/movies/${id}`, {
    headers: authHeader(),
  });
};

const movieService = {
  getAllMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};

export default movieService;
