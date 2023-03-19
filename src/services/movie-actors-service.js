import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getAllMovieActors = async () => {
  return await axios.get(API_URL + "/movie-actors", { headers: authHeader() });
};

const getMovieActorByMovieId = async (id) => {
  return await axios.get(API_URL + `/movie-actors/${id}`, {
    headers: authHeader(),
  });
};

const movieActorService = {
    getAllMovieActors,
    getMovieActorByMovieId,
};

export default movieActorService;