import { Badge, useColorModeValue, Wrap } from "@chakra-ui/react";
import { Movie } from "../hooks/useMovies";

interface Props {
  movie: Movie;
}

const Genres = ({ movie }: Props) => {
  const badgeBg = useColorModeValue("gray.200", "gray.800");
  const badgeColor = useColorModeValue("gray.800", "white");
  return (
    <Wrap spacing={0}>
      {movie.genres.map((genre) => (
        <Badge
          margin={1}
          fontSize={9}
          key={genre.id}
          bg={badgeBg}
          color={badgeColor}
        >
          {genre.name}
        </Badge>
      ))}
    </Wrap>
  );
};

export default Genres;
