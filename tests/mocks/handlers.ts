import { http, HttpResponse } from "msw";
import { db, createTestMovies } from "./db";

export const handlers = [
  /*  http.get("https://api.themoviedb.org/3/discover/movie", () => {
    const movies = createTestMovies(10);
    return HttpResponse.json({
      page: 1,
      total_pages: 1,
      total_results: movies.length,
      results: movies,
    });
  }), */
];

export const mockMovies = (count: number) => {
  const movies = createTestMovies(count);
  const handler = http.get(
    "https://api.themoviedb.org/3/discover/movie",
    () => {
      return HttpResponse.json({
        page: 1,
        total_pages: 1,
        total_results: movies.length,
        results: movies,
      });
    }
  );

  return { handler, movies };
};
