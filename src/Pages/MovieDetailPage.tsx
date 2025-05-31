import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useMovie from "../hooks/useMovie";
import DefinationItem from "../Components/DefinationItem";
import RatingScore from "../Components/RatingScore";
import { imgExtractionUrl } from "../services/ImageExtractionUrl";
import DefinationItems from "../Components/DefinationItem";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movie, isLoading, error } = useMovie(id!);
  if (isLoading) return <Spinner />;
  if (error || !movie) throw error;
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Box>
          <Heading>{movie.title}</Heading>
          <Text maxW="100vh" marginY={2}>
            {movie.overview}
          </Text>

          <SimpleGrid columns={2} maxW="150vh">
            <DefinationItem term="Rating" key={"rating"}>
              <RatingScore score={movie.vote_average} />
            </DefinationItem>
            <DefinationItem term="Release Date" key={"releasedate"}>
              {movie.release_date}
            </DefinationItem>
            <DefinationItems term="Runtime" key={"runtime"}>
              {movie.runtime + " minutes"}
            </DefinationItems>
          </SimpleGrid>
        </Box>
        <Image
          src={imgExtractionUrl + movie.backdrop_path}
          borderRadius={20}
          maxH={{ base: "100%", md: "100vh" }}
          maxW={{ base: "100%", md: "100vh" }}
          marginY={5}
        />
      </SimpleGrid>
    </Box>
  );
};

export default MovieDetailPage;
