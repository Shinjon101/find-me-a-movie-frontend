import { MovieFetchResponse } from "../services/apiClient";
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
  genres: string[];
  vote_average: number;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  overview: string;
}

const useMovies = (movieQuery: MovieQuery) => {
  const isSearch = Boolean(movieQuery.searchText);

  const endpoint = isSearch ? "search/movie" : "discover/movie";

  const prevEndpointRef = useRef<string | null>(null);

  if (isSearch && prevEndpointRef.current !== "search/movie") {
    movieQuery.genre = null;
    movieQuery.sortOrder = "popularity";
  }

  prevEndpointRef.current = endpoint;

  const apiClient = new APIClient(endpoint);
  return useInfiniteQuery<MovieFetchResponse<Movie>, Error>({
    queryKey: ["movies", movieQuery],
    queryFn: ({ pageParam }) => {
      const params: { [key: string]: any } = isSearch
        ? { query: movieQuery.searchText, page: pageParam }
        : {
            with_genres: movieQuery.genre?.id,
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

        movies = addGenreName(movies);
        if (isSearch) {
          movies = sortMovies(movies, movieQuery.sortOrder);
          if (movieQuery.genre?.name) {
            movies = sortSearchByGenre(movies, movieQuery.genre.name);
          }
        }
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
