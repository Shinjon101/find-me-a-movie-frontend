import apiClient from "../services/apiClient";
import { Movie} from "../hooks/useMovies";


interface Genre {
  id: number;
  name: string;
}
interface FetchMovieDetails {
  genres: Genre[];
}
export const addGenresToMovies = (movies: Movie[]) => {
  const promises = movies.map((movie) =>
    apiClient.get<FetchMovieDetails>(`/movie/${movie.id}`)
  );
  
  return Promise.all(promises)
    .then((responses) => {
      responses.forEach((response, index) => {
        movies[index].genres = response.data.genres.map(
          (genre) => genre.name
        );
      });
      return movies;
    })
    .catch((error) => {
      return error;
    });
};