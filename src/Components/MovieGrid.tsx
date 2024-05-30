import {
  Alert,
  AlertIcon,
  Box,
  Button,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import MovieCardContainer from "./MovieCardContainer";

import { MovieQuery } from "../App";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  movieQuery: MovieQuery;
}

const MovieGrid = ({ movieQuery }: Props) => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useMovies(movieQuery);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );

  const fetchedMoviesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <Box>
      <InfiniteScroll
        dataLength={fetchedMoviesCount}
        hasMore={hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
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
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((movie) => (
                <MovieCardContainer key={movie.id}>
                  <MovieCard key={movie.id} movie={movie}></MovieCard>
                </MovieCardContainer>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </Box>
  );
};

export default MovieGrid;
