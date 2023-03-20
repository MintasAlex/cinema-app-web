import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getAllBookings = () => {
  return axios.get(API_URL + "/bookings", { headers: authHeader() });
};

const getBooking = (id) => {
  return axios.get(API_URL + `/bookings/${id}`, {
    headers: authHeader(),
  });
};

const getBookingByScreeningId = (id) => {
  return axios.get(API_URL + `/bookings/screening/${id}`, {
    headers: authHeader(),
  });
};

const createBooking = (booking) => {
  return axios.post(API_URL + `/bookings`, booking, {
    headers: authHeader(),
  });
};

const bookingsService = {
  getAllBookings,
  getBooking,
  getBookingByScreeningId,
  createBooking,
};

export default bookingsService;
