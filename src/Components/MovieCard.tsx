import {
  Badge,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Movie } from "../hooks/useMovies";
import Genres from "./Genres";
import RatingScore from "./RatingScore";

interface Props {
  movie: Movie;
}
const imgExtractionUrl = "https://image.tmdb.org/t/p/original/";
const MovieCard = ({ movie }: Props) => {
  return (
    <Card>
      <Image src={imgExtractionUrl + movie.poster_path} />
      <CardBody>
        <Heading fontSize="2xl" marginBottom={3}>
          {movie.title}
        </Heading>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <Genres movie={movie} />
          <RatingScore score={movie.vote_average} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
