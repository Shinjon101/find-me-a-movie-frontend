import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { Movie } from "../Entities/Movie";
import Genres from "./Genres";
import RatingScore from "./RatingScore";
import { useNavigate } from "react-router-dom";
import { imgExtractionUrl } from "../services/ImageExtractionUrl";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`movies/${movie.id}`)}>
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
