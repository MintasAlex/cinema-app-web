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

const addScreening = (data) => {
  return axios.post(API_URL + "/screenings", data, {
    headers: authHeader(),
  });
};

const updateScreening = (id, data) => {
  return axios.put(API_URL + `/screenings/${id}`, data, {
    headers: authHeader(),
  });
};

const deleteScreening = (id) => {
  return axios.delete(API_URL + `/screenings/${id}`, {
    headers: authHeader(),
  });
};

const screeningService = {
  getAllScreenings,
  getScreening,
  getScreeningsByMovieId,
  addScreening,
  updateScreening,
  deleteScreening,
};

export default screeningService;
