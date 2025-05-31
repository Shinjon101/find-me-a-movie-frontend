import { Movie } from "../Entities/Movie";

export function sortSearchByGenre(
  movies: Movie[],
  genre: string | undefined
): Movie[] {
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase())
    );
    return filteredMovies;
  }
  return movies;
}
