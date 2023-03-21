import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getAllSeats = () => {
  return axios.get(API_URL + "/seats", { headers: authHeader() });
};

const getAllSeatsByCinemaHallId = (id) => {
  return axios.get(API_URL + `/seats/cinemaHall/${id}`, {
    headers: authHeader(),
  });
};

const getAllBookedSeats = () => {
  return axios.get(API_URL + "/seatBooked", { headers: authHeader() });
};

const getAllBookedSeatsByScreeningId = (id) => {
  return axios.get(API_URL + `/seatBooked/screening/${id}`, {
    headers: authHeader(),
  });
};

const getBookedSeatsByBookingId = (id) => {
  return axios.get(API_URL + `/seatBooked/${id}`, {
    headers: authHeader(),
  });
};

const createSeatBooked = (seatBooked) => {
  return axios.post(API_URL + `/seatBooked`, seatBooked, {
    headers: authHeader(),
  });
};

const deleteSeatBooked = (bookingId, seatId) => {
  return axios.delete(API_URL + `/seatBooked/${bookingId}/${seatId}`, {
    headers: authHeader(),
  });
};

const seatsService = {
  getAllSeats,
  getAllSeatsByCinemaHallId,
  getAllBookedSeats,
  getAllBookedSeatsByScreeningId,
  createSeatBooked,
  getBookedSeatsByBookingId,
  deleteSeatBooked,
};

export default seatsService;
