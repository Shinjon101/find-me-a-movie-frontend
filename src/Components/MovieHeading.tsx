import { Heading } from "@chakra-ui/react";
import { MovieQuery } from "../App";

interface Props {
  movieQuery: MovieQuery;
}

const MovieHeading = ({ movieQuery }: Props) => {
  let heading = "";
  movieQuery.searchText
    ? (heading = "Search Results")
    : movieQuery.genre?.name !== undefined
    ? (heading = `${movieQuery.genre?.name} Movies`)
    : (heading = "Popular Movies");
  return <Heading as="h1">{heading}</Heading>;
};

export default MovieHeading;
