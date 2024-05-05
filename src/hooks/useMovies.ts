import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { CanceledError } from "axios";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  genres?: string[]; 
}
interface FetchMovieResponse {
  page: number;
  results: Movie[];
}
interface Genre {
  id: number;
  name: string;
}
interface FetchMovieDetails {
  genres: Genre[];
}

const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<FetchMovieResponse>("/popular", { signal: controller.signal })
      .then((res) => {
        const resMovies = res.data.results;

        const promises = resMovies.map((movie) =>
          apiClient.get<FetchMovieDetails>(`/${movie.id}`)
        );
        Promise.all(promises)
          .then((responses) => {
            responses.forEach((response, index) => {
              resMovies[index].genres = response.data.genres.map(
                (genre) => genre.name
              );
            });
            setMovies(resMovies);
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort(); 
    
  }, []);

  return { movies, error };
};

export default useMovies;