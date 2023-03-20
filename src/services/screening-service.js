import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getAllScreenings = () => {
  return axios.get(API_URL + "/screenings", { headers: authHeader() });
};

const getScreening = (id) => {
  return axios.get(API_URL + `/screenings/${id}`, {
    headers: authHeader(),
  });
};

const getScreeningsByMovieId = (id) => {
  return axios.get(API_URL + `/screenings/movie/${id}`, {
    headers: authHeader(),
  });
};

const screeningService = {
  getAllScreenings,
  getScreening,
  getScreeningsByMovieId,
};

export default screeningService;
