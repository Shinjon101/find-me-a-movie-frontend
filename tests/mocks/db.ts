import { faker } from "@faker-js/faker";
import { factory, manyOf, primaryKey } from "@mswjs/data";

export const db = factory({
  genres: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 1000 })),
    name: faker.music.genre,
    movies: manyOf("movies"),
  },
  movies: {
    id: primaryKey(() => faker.number.int({ min: 1, max: 100000 })),
    title: faker.lorem.words,
    poster_path: () => faker.image.urlPicsumPhotos({ width: 342, height: 513 }),
    vote_average: () =>
      faker.number.float({ min: 0, max: 10, fractionDigits: 1 }),
    popularity: () => faker.number.float({ min: 0, max: 10000 }),
    runtime: () => faker.number.int({ min: 80, max: 180 }),
    release_date: () =>
      faker.date.past({ years: 10 }).toISOString().split("T")[0],
    overview: faker.lorem.paragraph,
    backdrop_path: faker.image.urlPicsumPhotos,
    genres: manyOf("genres"),
    genre_ids: () => [
      faker.number.int({ min: 1, max: 50 }),
      faker.number.int({ min: 1, max: 50 }),
    ],
  },
});

export const createTestMovies = (count = 10) => {
  db.movies.deleteMany({ where: {} });
  return Array.from({ length: count }, (_, index) =>
    db.movies.create({ id: index + 1 })
  );
};
