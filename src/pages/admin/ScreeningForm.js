import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ScreeningService from "../../services/screening-service";
import MovieService from "../../services/movies-service";
import CinemaHallService from "../../services/cinema-hall-service";
import "./ScreeningForm.css";
import { display } from "@mui/system";

export default function ScreeningForm({ screening }) {
  const [movieId, setMovieId] = useState("");
  const [cinemaHallId, setCinemaHallId] = useState("");
  const [startTimestamp, setStartTimestamp] = useState("");

  const [movies, setMovies] = useState([]);
  const [cinemaHalls, setCinemaHalls] = useState([]);

  const getMovies = async () =>
    await MovieService.getAllMovies().then((response) => {
      setMovies(response.data);
    });

  const getCinemaHalls = async () =>
    await CinemaHallService.getAllCinemaHalls().then((response) => {
      setCinemaHalls(response.data);
    });

  useEffect(() => {
    if (screening) {
      setMovieId(screening.movieId);
      setCinemaHallId(screening.cinemaHallId);
      setStartTimestamp(screening.startTimestamp);
    }
    getMovies();
    getCinemaHalls();
  }, [screening]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var newScreening = {
      movieId,
      cinemaHallId,
      startTimestamp,
    };
    if (screening) {
      ScreeningService.updateScreening(screening.id, newScreening).then(
        (response) => {
          document.getElementById("message").innerHTML = "Screening edited!";
        }
      );
    } else {
      ScreeningService.addScreening(newScreening).then((response) => {
        document.getElementById("message").innerHTML = "Screening added!";
      });
    }
  };

  return (
    <form className="screening-form-container" onSubmit={handleSubmit}>
      <FormControl
        style={{
          height: "400px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <TextField
          required
          select
          type={"number"}
          className="textfield"
          id="movie-id-input"
          label="Movie ID"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
        >
          {movies.map((movie) => (
            <MenuItem key={movie.id} value={movie.id}>
              {movie.id}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          select
          type={"number"}
          className="textfield"
          id="cinema-hall-id-input"
          label="Cinema Hall ID"
          value={cinemaHallId}
          onChange={(e) => setCinemaHallId(e.target.value)}
        >
          {cinemaHalls.map((cinemaHall) => (
            <MenuItem key={cinemaHall.id} value={cinemaHall.id}>
              {cinemaHall.id}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          type={"number"}
          className="textfield"
          id="start-timestamp-input"
          label="Start Timestamp"
          value={startTimestamp}
          onChange={(e) => {
            if (e.target.value == undefined || e.target.value == "")
              setStartTimestamp(0);
            else setStartTimestamp(parseInt(e.target.value));
          }}
        />
      </FormControl>
      {screening ? (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "3%" }}
        >
          Edit
        </Button>
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "3%" }}
        >
          Add
        </Button>
      )}
      <p id="message"></p>
    </form>
  );
}
