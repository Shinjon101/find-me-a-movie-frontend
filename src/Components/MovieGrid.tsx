import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieSimpleGrid from "./MovieSimpleGrid";
import SkeletonGrid from "./SkeletonGrid";
import useMovieQueryStore from "../services/movieQueryStore";

const MovieGrid = () => {
  const movieQuery = useMovieQueryStore((s) => s.movieQuery);
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useMovies(movieQuery);

  if (error)
    return (
      <Alert
        status="error"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        borderRadius="md"
      >
        <AlertIcon aria-hidden="true" />
        <Box>
          <AlertTitle sr-only>Error:</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Box>
      </Alert>
    );

  const fetchedMoviesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <Box as="section" aria-label="Movie Grid">
      <InfiniteScroll
        dataLength={fetchedMoviesCount}
        hasMore={hasNextPage}
        next={() => fetchNextPage()}
        loader={
          hasNextPage ? (
            <MovieSimpleGrid>
              <SkeletonGrid />
            </MovieSimpleGrid>
          ) : null
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
