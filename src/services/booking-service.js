import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getAllBookings = async () => {
  return await axios.get(API_URL + "/bookings", { headers: authHeader() });
};

const getBooking = async (id) => {
  return await axios.get(API_URL + `/bookings/${id}`, {
    headers: authHeader(),
  });
};

const createBooking = async (booking) => {
  return await axios.post(API_URL + `/bookings`, booking, {
    headers: authHeader(),
  });
};
