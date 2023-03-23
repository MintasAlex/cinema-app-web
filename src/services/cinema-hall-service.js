import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getAllCinemaHalls = () => {
  return axios.get(API_URL + "/cinema-halls", { headers: authHeader() });
};

const getCinemaHallById = (id) => {
    return axios.get(API_URL + `/cinema-halls/${id}`, { headers: authHeader() });
    };

const cinemaHallService = {
    getAllCinemaHalls,
    getCinemaHallById,
};

export default cinemaHallService;