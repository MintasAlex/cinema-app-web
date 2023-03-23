import MovieGenreService from "../../services/movie-genres-service";
import MovieActorsService from "../../services/movie-actors-service";
import MovieDirectorService from "../../services/movie-directors-service";

const getRow = (movie) => {
  const getMovieGenresByMovieId = async (movieId) => {
    let genres = await MovieGenreService.getMovieGenreByMovieId(movieId);
    genres = genres.data.map((genre) => genre.genreName).join(", ");
    return genres;
  };

  const getMovieActorsByMovieId = async (movieId) => {
    let actors = await MovieActorsService.getMovieActorByMovieId(movieId);
    actors = actors.data.map((actor) => actor.name).join(", ");
    return actors;
  };

  const getMovieDirectorsByMovieId = async (movieId) => {
    let directors = await MovieDirectorService.getMovieDirectorByMovieId(
      movieId
    );
    directors = directors.data.map((director) => director.name).join(", ");
    return directors;
  };

   (async () => {
    const genre = await getMovieGenresByMovieId(movie.id);
    const cast = await getMovieActorsByMovieId(movie.id);
    const director = await getMovieDirectorsByMovieId(movie.id);
    movie.genre = genre;
    movie.cast = cast;
    movie.director = director;
    })();

    return movie;
};

const movieRow = {
  getRow,
};

export default movieRow;
