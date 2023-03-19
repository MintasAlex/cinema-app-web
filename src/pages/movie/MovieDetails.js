import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../../services/auth-service";
import MovieService from "../../services/movies-service";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const {id} = useParams();

  const [movies, setMovies] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    MovieService.getMovie(id).then(
      (response) => {
        setMovies(response.data);
        console.log("Showing", response.data);
      },
      (error) => {
        if (error.response && error.response.status === 404) {
          navigate("/NotFound");
        } else 
        if (error.response && error.response.status === 401) {
          AuthService.logout();
          navigate("/");
          window.location.reload();
      }
      }
    );
  }, []);

  return (
    <>
      <h1>Movie</h1>
    </>
  );
}
