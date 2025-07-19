import { http, HttpResponse } from "msw";
import { db } from "./db";
const mockMovies = Array.from({ length: 10 }, () => db.movies.create());

export const handlers = [
  http.get("https://api.themoviedb.org/3/discover/movie", () => {
    return HttpResponse.json({
      page: 1,
      total_pages: 1,
      total_results: mockMovies.length,
      results: mockMovies,
    });
  }),
];
