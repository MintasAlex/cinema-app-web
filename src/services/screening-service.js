import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getAllScreenings = async () => {
  return await axios.get(API_URL + "/screenings", { headers: authHeader() });
};

const getScreening = async (id) => {
  return await axios.get(API_URL + `/screenings/${id}`, {
    headers: authHeader(),
  });
};

const getScreeningsByMovieId = async (id) => {
  return await axios.get(API_URL + `/screenings/movie/${id}`, {
    headers: authHeader(),
  });
};

const screeningService = {
  getAllScreenings,
  getScreening,
  getScreeningsByMovieId,
};

export default screeningService;
