import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { CanceledError } from "axios";
import { addGenresToMovies } from "../services/addGenre";
import { Genre } from "./useGeneres";
import { MovieQuery } from "../App";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genres: string[]; 
  vote_average: number;
}
interface FetchMovieResponse {
  page: number;
  results: Movie[];
}

const useMovies = (movieQuery: MovieQuery ) => {
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchMovieResponse>('/discover/movie',{ params:{
        with_genres: movieQuery.genre?.id,
        signal: controller.signal
      }})
      .then((res) => {
        const resMovies = res.data.results;
        addGenresToMovies(resMovies)
          .then((moviesWithGenres) => {
            setMovies(moviesWithGenres);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort(); 
  }, [movieQuery]);

  return { movies, error, isLoading };
};


export default useMovies;