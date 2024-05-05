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

interface Props {
  movie: Movie;
}
const MovieCard = ({ movie }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} />
      <CardBody>
        <Heading fontSize="2xl">{movie.title}</Heading>
        <HStack justifyContent="space-between">
          <Genres movie={movie}></Genres>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
