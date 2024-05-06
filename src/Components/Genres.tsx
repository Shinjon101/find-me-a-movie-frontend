import { Badge, Wrap } from "@chakra-ui/react";
import { Movie } from "../hooks/useMovies";

interface Props {
  movie: Movie;
}

const Genres = ({ movie }: Props) => {
  return (
    <Wrap spacing={0}>
      {movie.genres?.map((genre) => (
        <Badge margin={1} fontSize={10}>
          {genre}
        </Badge>
      ))}
    </Wrap>
  );
};

export default Genres;
