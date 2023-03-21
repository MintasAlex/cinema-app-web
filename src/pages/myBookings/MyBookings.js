import "./MyBookings.css";
import { useState, useEffect } from "react";
import BookingsService from "../../services/booking-service";
import SeatsService from "../../services/seats-service";
import { DataGrid } from "@mui/x-data-grid";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const getUserBookings = async () => {
    await BookingsService.getBookingsByUserId(user.id)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getBookedSeatsByBookingId = async (id) => {
    await SeatsService.getBookedSeatsByBookingId(id)
      .then((response) => {
        setBookedSeats(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteBooking = async (bookingId) => {
    await SeatsService.getBookedSeatsByBookingId(bookingId)
      .then((response) => {
        setBookedSeats(response.data);
        console.log(response.data);
        response.data.forEach((seat) => {
          SeatsService.deleteSeatBooked(bookingId, seat.seatId);
        });
        BookingsService.deleteBooking(bookingId);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUserBookings();
  }, []);

  const timestampToDate = (timestamp) => {
    let date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const timestampToTime = (timestamp) => {
    let date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

    const handleDelete = async (bookingId) => {
        deleteBooking(bookingId);
    };

  return (
    <div id="my-bookings-page-container">
      <div id="my-bookings-content-container">
        <h1>My Bookings</h1>
        <table>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Date</th>
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.screening.movie.title}</td>
                <td>
                  {timestampToDate(booking.screening.startTimestamp)}{" "}
                  {timestampToTime(booking.screening.startTimestamp)}
                </td>
                <td>
                  <button onClick={() => handleDelete(booking.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
