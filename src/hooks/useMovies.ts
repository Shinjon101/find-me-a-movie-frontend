import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { CanceledError } from "axios";
import { MovieQuery } from "../App";
import { addGenreName } from "../services/addGenre";
import useData from "./useData";
import { resolveStyleConfig } from "@chakra-ui/react";

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

const useMovies = (movieQuery: MovieQuery) => {
  let endpoint = "discover/movie";
  movieQuery.searchText
    ? (endpoint = "search/movie")
    : (endpoint = "discover/movie");

  const{data, error, isLoading}=useData<Movie>(endpoint, {params:{
    with_genres: movieQuery.genre?.id,
    sort_by: movieQuery.sortOrder,
    query: movieQuery.searchText} },addGenreName, [movieQuery])

   return {data, error, isLoading}
};
export default useMovies;