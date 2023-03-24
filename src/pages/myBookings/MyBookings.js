import "./MyBookings.css";
import { useState, useEffect } from "react";
import BookingsService from "../../services/booking-service";
import SeatsService from "../../services/seats-service";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

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

  const handleDelete = async (event, param) => {
    deleteBooking(param.id);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "movie", headerName: "Movie", width: 400 },
    { field: "date", headerName: "Date", width: 200 },
    {
      field: "delete",
      headerName: "Delete?",
      width: 120,
      renderCell: (cellValues) => {
        return (
          <Button
            className="delete-button"
            variant="contained"
            color="error"
            onClick={(event) => handleDelete(event, cellValues)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const rows = bookings.map((booking) => ({
    id: booking.id,
    movie: booking.screening.movie.title,
    date: `${timestampToDate(
      booking.screening.startTimestamp
    )} ${timestampToTime(booking.screening.startTimestamp)}`,
  }));

  return (
    <div id="my-bookings-page-container">
      <div id="my-bookings-content-container">
        <h1>My Bookings</h1>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </div>
    </div>
  );
}
