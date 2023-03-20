import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getAllMovieActors = () => {
  return axios.get(API_URL + "/movie-actors", { headers: authHeader() });
};

const getMovieActorByMovieId = (id) => {
  return axios.get(API_URL + `/movie-actors/${id}`, {
    headers: authHeader(),
  });
};

const movieActorService = {
  getAllMovieActors,
  getMovieActorByMovieId,
};

export default movieActorService;
