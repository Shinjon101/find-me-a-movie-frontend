import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { CanceledError } from "axios";

import { MovieQuery } from "../App";
import { addGenreName } from "../services/addGenre2";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genres: string[]; 
  vote_average: number;
  genre_ids: number[]
}
interface FetchMovieResponse {
  page: number;
  results: Movie[];
}

const useMovies = (movieQuery: MovieQuery, endpoint:string ) => {
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchMovieResponse>(endpoint,{ params:{
        with_genres: movieQuery.genre?.id,
        signal: controller.signal,
        sort_by: movieQuery.sortOrder,
        query: movieQuery.searchText
      }})
      .then((res) => {
      
        const resMovies = res.data.results;
         const moddified = addGenreName(resMovies)
        setMovies(moddified);
        setLoading(false)
       

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