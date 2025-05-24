import { Heading } from "@chakra-ui/react";
import useMovieQueryStore from "../services/movieQueryStore";

const MovieHeading = () => {
  const movieQuery = useMovieQueryStore((s) => s.movieQuery);
  let heading = "";
  movieQuery.searchText
    ? (heading = "Search Results")
    : movieQuery.genre?.name !== undefined
    ? (heading = `${movieQuery.genre?.name} Movies`)
    : (heading = "Popular Movies");
  return <Heading as="h1">{heading}</Heading>;
};

export default MovieHeading;
