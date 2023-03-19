import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getAllMovieDirectors = async () => {
  return await axios.get(API_URL + "/movie-directors", { headers: authHeader() });
};

const getMovieDirectorByMovieId = async (id) => {
  return await axios.get(API_URL + `/movie-directors/${id}`, {
    headers: authHeader(),
  });
};

const movieDirectorService = {
    getAllMovieDirectors,
    getMovieDirectorByMovieId,
};

export default movieDirectorService;