import { http, HttpResponse } from "msw";
import { db, createTestMovies } from "./db";

export const handlers = [];

export const mockMovies = (count: number) => {
  const movies = createTestMovies(count);
  const handler = http.get(`${import.meta.env.VITE_API_URL}/api`, () => {
    return HttpResponse.json({
      page: 1,
      total_pages: 1,
      total_results: movies.length,
      results: movies,
    });
  });

  return { handler, movies };
};
