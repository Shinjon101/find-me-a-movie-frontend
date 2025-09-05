import { Genre, MovieFetchResponse } from "../services/apiClient";
import { MovieQuery } from "../services/movieQueryStore";
import { addGenreName } from "../services/addGenre";
import { sortMovies } from "../services/sortSearch";
import { sortSearchByGenre } from "../services/sortSearchByGenre";
import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { useRef } from "react";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genres: Genre[];
  vote_average: number;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  overview: string;
  backdrop_path: string;
  runtime: number;
}

const useMovies = (movieQuery: MovieQuery) => {
  const endpoint = "/movies";

  const apiClient = new APIClient(endpoint);
  return useInfiniteQuery<MovieFetchResponse<Movie>, Error>({
    queryKey: ["movies", movieQuery],
    queryFn: ({ pageParam }) => {
      const params: { [key: string]: any } = {
        search: movieQuery?.searchText,
        with_genres: movieQuery.genre?.name,
        sort_by: movieQuery.sortOrder,
        page: pageParam,
      };

      return apiClient.getMovies(params);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.results.length ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 24 * 60 * 60 * 1000, //24h
    select: (data) => {
      const processedPages = data.pages.map((page) => {
        let movies = page.results;
        return {
          ...page,
          results: movies,
        };
      });

      return {
        ...data,
        pages: processedPages,
      };
    },
  });
};

export default useMovies;
