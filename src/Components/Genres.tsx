import { Badge, HStack } from "@chakra-ui/react";
import { Movie } from "../hooks/useMovies";

interface Props {
  movie: Movie;
}

const Genres = ({ movie }: Props) => {
  return (
    <div>
      {movie.genres?.map((genre) => (
        <Badge margin={2}>{genre}</Badge>
      ))}
    </div>
  );
};

export default Genres;
