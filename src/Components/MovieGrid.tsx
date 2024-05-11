import { Alert, AlertIcon, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import MovieCardContainer from "./MovieCardContainer";

import { MovieQuery } from "../App";

interface Props {
  movieQuery: MovieQuery;
}

const MovieGrid = ({ movieQuery }: Props) => {
  const { data: movies, error, isLoading } = useMovies(movieQuery);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        spacing={8}
        padding={2}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <MovieCardContainer key={skeleton}>
              <MovieCardSkeleton key={skeleton} />
            </MovieCardContainer>
          ))}
        {movies.map((movie) => (
          <MovieCardContainer key={movie.id}>
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          </MovieCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default MovieGrid;
