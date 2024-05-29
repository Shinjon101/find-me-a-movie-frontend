import { FetchResponse } from "../services/apiClient";
import { MovieQuery } from "../App";
import { addGenreName } from "../services/addGenre";
import {sortMovies } from "../services/sortSearch"
import { sortSearchByGenre } from "../services/sortSearchByGenre";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

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
 
const {data, error, isLoading} = useQuery(
 {
  queryKey:['movies', movieQuery],
  queryFn: ()=>apiClient.get<FetchResponse<Movie>>(endpoint,{params}).then((res)=>res.data),
  select: data=>{
     
    let movies = data.results
    movies = addGenreName(movies)
     if(isSearch)
      {
        movies = sortMovies(movies, movieQuery.sortOrder);
        if(movieQuery.genre?.name) {
          movies = sortSearchByGenre(movies, movieQuery.genre.name);
        }
      }
    
   return movies;
  }
 }
)
        
return { data, error, isLoading };
   
};
export default useMovies;