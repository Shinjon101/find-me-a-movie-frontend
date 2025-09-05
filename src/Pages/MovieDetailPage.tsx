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
import MovieDetailSkeleton from "../Components/MovieDetailSkeleton";

const MovieDetailPage = () => {
  const placeHolderImageUrl = "https://placehold.co/342x192?text=No Poster";
  const { id } = useParams();
  const { data: movie, isLoading, error } = useMovie(id!);
  if (isLoading) return <MovieDetailSkeleton />;
  if (error || !movie) throw error;

  return (
    <Box padding="20px" paddingLeft="50px">
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Box>
          <Heading>{movie.title}</Heading>
          <Text maxW="100vh" marginY={2}>
            {movie.overview}
          </Text>

          <SimpleGrid columns={2} maxW="150vh">
            <DefinationItem term="Genre" key={"genre"}>
              {movie.genres.map((genre, index) => (
                <Text key={index}>{genre.name}</Text>
              ))}
            </DefinationItem>
            <DefinationItem term="Rating" key={"rating"}>
              <RatingScore score={movie.vote_average} />
            </DefinationItem>
            <DefinationItem term="Release Date" key={"releasedate"}>
              {movie.release_date.substring(0, 10)}
            </DefinationItem>
            <DefinationItems term="Runtime" key={"runtime"}>
              {movie.runtime + " minutes"}
            </DefinationItems>
          </SimpleGrid>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Image
            src={
              movie.backdrop_path
                ? imgExtractionUrl + movie.backdrop_path
                : placeHolderImageUrl
            }
            borderRadius={20}
            maxH={{ base: "100%", md: "100vh" }}
            maxW={{ base: "100%", md: "100vh" }}
            marginY={5}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default MovieDetailPage;
