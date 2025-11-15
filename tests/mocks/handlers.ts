import { http, HttpResponse } from "msw";
import { db, createTestMovies } from "./db";

export const handlers = [];

export const mockMovies = (count: number) => {
  const movies = createTestMovies(count);

  const handler = http.get("http://localhost/api/movies*", () => {
    return HttpResponse.json({ results: movies });
  });

  return { handler, movies };
};
