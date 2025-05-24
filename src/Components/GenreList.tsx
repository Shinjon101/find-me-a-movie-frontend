import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useGeneres from "../hooks/useGeneres";
import useMovieQueryStore from "../services/movieQueryStore";

const GenreList = () => {
  const { data, isLoading, error } = useGeneres();
  const setGenre = useMovieQueryStore((s) => s.setGenre);
  const selectedGenreId = useMovieQueryStore((s) => s.movieQuery.genre?.id);

  if (isLoading) return <Spinner />;
  if (error) return null;
  return (
    <Box marginTop="10px">
      <Heading fontSize="2xl">Genres</Heading>
      <List>
        {data?.genres.map((genre) => (
          <ListItem key={genre.id} margin="3px">
            <Button
              fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
              onClick={() => {
                setGenre(genre);
              }}
              variant="link"
            >
              {genre.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GenreList;
