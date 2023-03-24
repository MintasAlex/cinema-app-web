import { useState, useEffect } from "react";
import MovieService from "../../services/movies-service";

import { Button, TextField } from "@mui/material";
import "./MovieForm.css";

export default function MovieForm({ movie }) {
  const [title, setTitle] = useState("");
  const [runtimeMinutes, setRuntimeMinutes] = useState("");
  const [score, setScore] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [picturePath, setPicturePath] = useState("");

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setRuntimeMinutes(movie.duration);
      setScore(movie.score);
      setRating(movie.rating);
      setDescription(movie.description);
      setPicturePath(movie.poster);
    }
  }, [movie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var newMovie = {
      title,
      runtimeMinutes,
      score,
      rating,
      description,
      picturePath,
    };
    newMovie.runtimeMinutes = await parseInt(newMovie.runtimeMinutes);
    if (movie) {
      MovieService.updateMovie(movie.id, newMovie).then((response) => {
        document.getElementById("message").innerHTML = "Movie edited!";
      });
    } else {
      MovieService.addMovie(newMovie).then((response) => {
        document.getElementById("message").innerHTML = "Movie added!";
      });
    }
  };

  return (
    <form className="movie-form-container" onSubmit={handleSubmit}>
      <TextField
        required
        className="textfield"
        id="movie-title-input"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        inputProps={{ maxLength: 255 }}
      />

      <TextField
        required
        className="textfield"
        type={"number"}
        id="movie-duration-input"
        label="Duration"
        value={runtimeMinutes}
        onChange={(e) => {
          if (e.target.value === undefined || e.target.value === "")
            setRuntimeMinutes(0);
          else setRuntimeMinutes(parseInt(e.target.value));
        }}
      />

      <TextField
        required
        className="textfield"
        id="movie-score-input"
        label="Score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        inputProps={{ maxLength: 3 }}
      />

      <TextField
        required
        className="textfield"
        id="movie-rating-input"
        label="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        inputProps={{ maxLength: 10 }}
      />

      <TextField
        required
        className="textfield"
        id="movie-description-input"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <TextField
        className="textfield"
        id="movie-picturePath-input"
        label="Picture Path"
        value={picturePath}
        onChange={(e) => setPicturePath(e.target.value)}
        inputProps={{ maxLength: 255 }}
      />

      {movie ? (
        <Button
          className="button"
          variant="contained"
          type="submit"
          style={{ marginTop: "3%" }}
        >
          Edit
        </Button>
      ) : (
        <Button
          className="button"
          variant="contained"
          type="submit"
          style={{ marginTop: "3%" }}
        >
          Add
        </Button>
      )}
      <p id="message"></p>
    </form>
  );
}
