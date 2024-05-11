
import { MovieQuery } from "../App";
import { addGenreName } from "../services/addGenre";
import useData from "./useData";
import {sortMovies } from "../services/sortSearch"
import { sortSearchByGenre } from "../services/sortSearchByGenre";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genres: string[]; 
  vote_average: number;
  genre_ids: number[]
  popularity: number;
  release_date: string
}


const useMovies = (movieQuery: MovieQuery) => {
 
 
  if(movieQuery.searchText) {
    const{data, error, isLoading}=useData<Movie>("search/movie", {params:{
      query: movieQuery.searchText} },addGenreName, [movieQuery],sortMovies,movieQuery.sortOrder, sortSearchByGenre,movieQuery.genre?.name)
     return {data, error, isLoading}
  }
  else {

    const{data, error, isLoading}=useData<Movie>("discover/movie", {params:{
      with_genres: movieQuery.genre?.id,
      sort_by: movieQuery.sortOrder,
      query: movieQuery.searchText} },addGenreName, [movieQuery])
      return {data, error, isLoading}
  }

};
export default useMovies;