import "./ScreeningDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ScreeningService from "../../services/screening-service";
import BookingService from "../../services/booking-service";
import SeatsService from "../../services/seats-service";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ScreeningDetails() {
  const [screening, setScreening] = useState(null);
  const [screeningSeats, setScreeningSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  let seatsToBook = [];

  const URL = "http://localhost:3000/";

  const { id } = useParams();

  const getScreening = async (id) =>
    await ScreeningService.getScreening(id).then(
      (response) => {
        setScreening(response.data);
        getScreeningSeats(response.data.cinemaHall.id);
      },
      (error) => {
        console.log(error);
      }
    );

  const getBookingByScreeningId = async (id) =>
    await BookingService.getBookingByScreeningId(id).then(
      (response) => {
        setScreeningSeats(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

  const getScreeningSeats = (id) =>
    SeatsService.getAllSeatsByCinemaHallId(id).then(
      (response) => {
        setScreeningSeats(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

  const getAllBookedSeatsByScreeningId = async (id) =>
    await SeatsService.getAllBookedSeatsByScreeningId(id).then(
      (response) => {
        setBookedSeats(response.data);
      },
      (error) => {
        console.log(error);
      }
    );

  useEffect(() => {
    getScreening(id);
    getBookingByScreeningId(id);
    getAllBookedSeatsByScreeningId(id);
  }, []);

  const handleClickSeat = (e) => {
    if (seatsToBook.includes(e.target.id)) {
      e.target.style.backgroundColor = "white";
      seatsToBook = seatsToBook.filter((seat) => seat !== e.target.id);
    } else {
      e.target.style.backgroundColor = "green";
      seatsToBook.push(e.target.id);
    }
  };

  const handleClickSubmit = async () => {
    if (seatsToBook.length === 0) {
      alert("Please select at least one seat");
    } else {
      const newBooking = {
        screeningId: id,
        userId: user.id,
      };
      const bookingId = await (
        await BookingService.createBooking(newBooking)
      ).data.id;
      seatsToBook.forEach(async (seat) => {
        const seatBooked = {
          seatId: seat,
          screeningId: id,
          bookingId: bookingId,
        };
        await SeatsService.createSeatBooked(seatBooked);
      });
      alert("Booking successful");
      navigate("/");
    }
  };

  const seatsBookedForScreening = bookedSeats.map((seat) => seat.seatId);

  return (
    <div id="screening-page-container">
      <div id="screening-details-container">
        <h1>Select your seats:</h1>
        {screeningSeats.length > 0 && bookedSeats && (
          <div id="screening-seats-container">
            {screeningSeats.map((seat) => (
              <div
                key={seat.id}
                id={seat.id}
                className="screening-seat"
                onClick={handleClickSeat}
                style={
                  seatsBookedForScreening.includes(seat.id)
                    ? { backgroundColor: "red", pointerEvents: "none" }
                    : { backgroundColor: "white" }
                }
              >
                <p>{seat.seatName}</p>
              </div>
            ))}
          </div>
        )}
        <Button
          className="submit-button"
          variant="contained"
          style={{ marginTop: "5%" }}
          onClick={handleClickSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
