import useData from "./useData";
import { MovieQuery } from "../App";
import { addGenreName } from "../services/addGenre";
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
 
  const isSearch = Boolean(movieQuery.searchText);
  const endpoint = isSearch? "search/movie":"discover/movie";
  const params: {[key:string]: any} = 
  isSearch?
   {query: movieQuery.searchText}:
   {
    with_genres: movieQuery.genre?.id,
    sort_by: movieQuery.sortOrder
   }
 
const {data, error, isLoading} = useData(endpoint, {params}, addGenreName, [movieQuery],
  isSearch ? sortMovies : undefined,
  isSearch ? movieQuery.sortOrder : undefined,
  isSearch ? sortSearchByGenre : undefined,
  isSearch ? movieQuery.genre?.name : undefined
);
return {data, error,isLoading};
        
 
   
};
export default useMovies;