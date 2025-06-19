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
import ReleaseDate from "./ReleaseDate";

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
        width={{ base: "12rem", sm: "auto" }}
        maxW="full"
        aspectRatio={2 / 3}
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
          transition="transform 0.4s ease-in-out"
          _groupHover={{ transform: "scale(1.05)" }}
        />
        <Box
          position="absolute"
          top="2"
          right="2"
          zIndex="1"
          transition="transform 0.3s ease-in-out"
          _groupHover={{ transform: "scale(1.05)" }}
        >
          <RatingScore score={movie.vote_average} />
        </Box>

        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="100%"
          bgGradient="linear(to-b, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.75))"
          color="white"
          padding={2}
          transform={
            showOverlayByDefault ? "translateY(0)" : "translateY(100%)"
          }
          opacity={showOverlayByDefault ? 1 : 0}
          transition="transform 0.3s ease-in-out, opacity 0.3s ease-in-out"
          _groupHover={{
            transform: "translateY(0)",
            opacity: 1,
          }}
          zIndex="1"
        >
          <Heading fontSize="lg" noOfLines={2}>
            {movie.title}
          </Heading>

          <HStack mt={2}>
            <Genres movie={movie} />
            <ReleaseDate rDate={movie.release_date} />
          </HStack>
        </Box>
      </Box>
    </LinkBox>
  );
};

export default MovieCard;
