import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../../services/auth-service";
import MovieService from "../../services/movies-service";
import MovieGenreService from "../../services/movie-genres-service";
import MovieActorsService from "../../services/movie-actors-service";
import MovieDirectorService from "../../services/movie-directors-service";
import ScreeningService from "../../services/screening-service";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import MovieRow from "./MovieRow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import MovieForm from "./MovieForm";
import MovieDialog from "./MovieDialog";
import ScreeningDialog from "./ScreeningDialog";
import ScreeningForm from "./ScreeningForm";

export default function Admin() {
  const [movies, setMovies] = useState([]);
  const [screenings, setScreenings] = useState([]);

  const [movieOpen, setMovieOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [screeningOpen, setScreeningOpen] = useState(false);
  const [editScreeningOpen, setEditScreeningOpen] = useState(false);
  const [deleteMovieOpen, setDeleteMovieOpen] = useState(false);
  const [deleteScreeningOpen, setDeleteScreeningOpen] = useState(false);

  const [movie, setMovie] = useState({});
  const [screening, setScreening] = useState({});

  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();

  const getMovies = async () =>
    await MovieService.getAllMovies().then(
      async (response) => {
        setMovies(response.data);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          AuthService.logout();
          navigate("/");
          window.location.reload();
        }
      }
    );

  const getScreenings = async () =>
    await ScreeningService.getAllScreenings().then(
      async (response) => {
        setScreenings(response.data);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          AuthService.logout();
          navigate("/");
          window.location.reload();
        }
      }
    );

  const handleClickMovieOpen = () => {
    setMovieOpen(true);
  };

  const handleMovieClose = () => {
    setMovieOpen(false);
    window.location.reload();
  };

  const handleClickEditMovieOpen = (param, event) => {
    setMovie(event.row);
    setEditOpen(true);
  };

  const handleClickMovieDelete = (param, event) => {
    MovieService.deleteMovie(event.row.id);
    window.location.reload();
  };

  const handleClickScreeningOpen = () => {
    setScreeningOpen(true);
  };

  const handleScreeningClose = () => {
    setScreeningOpen(false);
    window.location.reload();
  };

  const handleClickEditScreeningOpen = (param, event) => {
    setScreening(event.row);
    setEditScreeningOpen(true);
  };

  const handleClickScreeningDelete = (param, event) => {
    ScreeningService.deleteScreening(event.row.id);
    window.location.reload();
  };


  useEffect(() => {
    getMovies();
    getScreenings();
  }, []);

  const movieColumns = [
    {
      field: "edit",
      headerName: "Edit?",
      width: 90,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              className="edit-button"
              variant="contained"
              onClick={(event) => handleClickEditMovieOpen(event, cellValues)}
            >
              Edit
            </Button>
          </>
        );
      },
    },
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
            onClick={(event) => handleClickMovieDelete(event, cellValues)}
          >
            Delete
          </Button>
        );
      },
    },
    { field: "id", headerName: "ID", width: 50 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "duration", headerName: "Duration", width: 80 },
    { field: "score", headerName: "Score", width: 60 },
    { field: "rating", headerName: "Rating", width: 90 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "poster", headerName: "Poster", width: 150 },
    // { field: "genre", headerName: "Genre", width: 200 },
    // { field: "director", headerName: "Director", width: 200 },
    // { field: "cast", headerName: "Cast", width: 400 },
  ];

  const screeningColumns = [
    {
      field: "edit",
      headerName: "Edit?",
      width: 90,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              className="edit-button"
              variant="contained"
              onClick={(event) =>
                handleClickEditScreeningOpen(event, cellValues)
              }
            >
              Edit
            </Button>
          </>
        );
      },
    },
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
            onClick={(event) => handleClickScreeningDelete(event, cellValues)}
          >
            Delete
          </Button>
        );
      },
    },
    { field: "id", headerName: "ID", width: 50 },
    { field: "movieId", headerName: "Movie ID", width: 100 },
    { field: "cinemaHallId", headerName: "Cinema Hall ID", width: 130 },
    { field: "startTimestamp", headerName: "Start Timestamp", width: 200 },
  ];

  let movieRows = movies.map((movie) => {
    const row = MovieRow.getRow(movie);

    return {
      id: row.id,
      title: row.title,
      duration: row.runtimeMinutes,
      score: row.score,
      rating: row.rating,
      description: row.description,
      poster: row.picturePath,
      // genre: row.genre,
      // director: row.cast,
      // cast: row.director,
    };
  });

  let screeningRows = screenings.map((screening) => {
    return {
      id: screening.id,
      movieId: screening.movieId,
      cinemaHallId: screening.cinemaHallId,
      startTimestamp: screening.startTimestamp,
    };
  });

  return (
    <div id="admin-page-container">
      <div id="admin-content-container">
        <h1>Admin Panel</h1>
        <h2>Movies</h2>
        <Button
          id="add-movie-button"
          style={{ margin: "3%" }}
          onClick={handleClickMovieOpen}
        >
          <AddIcon></AddIcon> Add Movie
        </Button>
        <Dialog open={movieOpen} onClose={handleMovieClose}>
          <DialogTitle width={{ width: "500px" }}>Add Movie</DialogTitle>
          <DialogContent>
            <DialogContentText>Please fill the form bellow.</DialogContentText>
          </DialogContent>
          <MovieForm></MovieForm>
          <DialogActions>
            <Button onClick={handleMovieClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <MovieDialog
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          movie={movie}
        ></MovieDialog>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={movieRows}
            columns={movieColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>

        <h2 style={{ marginTop: "10%" }}>Screenings</h2>
        <Button
          id="add-screening-button"
          style={{ margin: "3%" }}
          onClick={handleClickScreeningOpen}
        >
          <AddIcon></AddIcon> Add screening
        </Button>
        <Dialog open={screeningOpen} onClose={handleScreeningClose}>
          <DialogTitle width={{ width: "500px" }}>Add Screening</DialogTitle>
          <DialogContent>
            <DialogContentText>Please fill the form bellow.</DialogContentText>
          </DialogContent>
          <ScreeningForm></ScreeningForm>
          <DialogActions>
            <Button onClick={handleScreeningClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <ScreeningDialog
          editScreeningOpen={editScreeningOpen}
          setEditScreeningOpen={setEditScreeningOpen}
          screening={screening}
        ></ScreeningDialog>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={screeningRows}
            columns={screeningColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </div>
  );
}
