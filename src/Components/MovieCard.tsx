import {
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  LinkBox,
  useBreakpointValue,
} from "@chakra-ui/react";
import Genres from "./Genres";
import { Link as RouterLink } from "react-router-dom";
import RatingScore from "./RatingScore";

import { imgExtractionUrl } from "../services/ImageExtractionUrl";
import { Movie } from "../hooks/useMovies";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const showOverlayByDefault = useBreakpointValue({ base: true, md: false });

  return (
    <LinkBox
      as={RouterLink}
      to={`/movies/${movie.id}`}
      _hover={{ textDecoration: "none" }}
    >
      <Box
        position="relative"
        height="400px"
        cursor="pointer"
        borderRadius="lg"
        overflow="hidden"
        role="group"
        _hover={{ boxShadow: "lg" }}
      >
        <Image
          src={imgExtractionUrl + movie.poster_path}
          alt={movie.title}
          width="100%"
          height="100%"
          objectFit="cover"
          transition="transform 0.3s"
          _groupHover={{ transform: "scale(1.05)" }}
        />

        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="100%"
          bgGradient="linear(to-b, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.75))"
          color="white"
          padding={4}
          opacity={showOverlayByDefault ? 1 : 0}
          _groupHover={{ opacity: 1 }}
          transition="opacity 0.3s"
          zIndex="1"
        >
          <Heading fontSize="lg" noOfLines={2}>
            {movie.title}
          </Heading>

          <HStack mt={2}>
            <Genres movie={movie} />

            <RatingScore score={movie.vote_average} />
          </HStack>
        </Box>
      </Box>
    </LinkBox>
  );
};

export default MovieCard;
