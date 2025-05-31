import { Movie } from "../hooks/useMovies";
import Genres from "../data/genres";
import { Genre } from "./apiClient";

const genres = Genres;
export const addGenreName = (movies: Movie[]) => {
  movies.forEach((movie) => {
    movie.genres = movie.genre_ids
      .map((genreId) => genres.find((genre) => genre.id === genreId))
      .filter((genre): genre is Genre => genre !== undefined);
  });

  return movies;
};
