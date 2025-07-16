import { Movie } from "../../src/hooks/useMovies";
import { faker } from "@faker-js/faker";

export const generateMockMovie = (overrides?: Partial<Movie>): Movie => {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    title: faker.lorem.words({ min: 3, max: 5 }),
    poster_path: faker.image.urlPicsumPhotos({ width: 342, height: 513 }),
    genres: [
      { id: 1, name: "Action" },
      { id: 2, name: "Drama" },
    ],
    vote_average: faker.number.float({ max: 10, min: 0, fractionDigits: 1 }),
    genre_ids: [1, 2],
    popularity: faker.number.float({ min: 0, max: 10000 }),
    runtime: faker.number.int({ min: 80, max: 180 }),
    release_date: faker.date.past({ years: 10 }).toISOString().split("T")[0],
    overview: faker.lorem.paragraph(),
    backdrop_path: faker.image.urlPicsumPhotos(),
    ...overrides,
  };
};
