import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { CanceledError } from "axios";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
}
interface FetchMovieResponse {
  page: number;
  results: Movie[];
}
const useMovies = () =>{
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<FetchMovieResponse>("/popular", {signal: controller.signal}) 
      .then((res) => setMovies(res.data.results))
      .catch((err) => {
        if(err instanceof CanceledError) return;
        setError(err.message)});
  return ()=> controller.abort();   
  }, []);
 return {movies, error}
}
export default useMovies;