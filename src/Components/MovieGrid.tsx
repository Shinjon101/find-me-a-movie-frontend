import { Alert, AlertIcon, Box, Spinner } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieQuery } from "../App";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieSimpleGrid from "./MovieSimpleGrid";
import SkeletonGrid from "./SkeletonGrid";

interface Props {
  movieQuery: MovieQuery;
}

const MovieGrid = ({ movieQuery }: Props) => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useMovies(movieQuery);

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
        loader={
          <MovieSimpleGrid>
            <SkeletonGrid />
          </MovieSimpleGrid>
        }
      >
        <MovieSimpleGrid>
          {isLoading && <SkeletonGrid />}
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((movie) => (
                <MovieCardContainer key={movie.id}>
                  <MovieCard key={movie.id} movie={movie}></MovieCard>
                </MovieCardContainer>
              ))}
            </React.Fragment>
          ))}
        </MovieSimpleGrid>
      </InfiniteScroll>
    </Box>
  );
};

export default MovieGrid;
