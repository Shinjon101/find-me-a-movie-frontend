import { Movie } from "../hooks/useMovies";

export const sortMovies = (
  movies: Movie[],
  sortOrder: string | undefined
): Movie[] => {
  const sortedMovies = [...movies];
  sortedMovies.sort((a, b) => {
    switch (sortOrder) {
      case "popularity":
        return b.popularity - a.popularity;
      case "primary_release_date.desc":
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      case "title.asc":
        return a.title.localeCompare(b.title);
      case "vote_average.desc":
        return b.vote_average - a.vote_average;
      default:
        return 0;
    }
  });
  return sortedMovies;
};
