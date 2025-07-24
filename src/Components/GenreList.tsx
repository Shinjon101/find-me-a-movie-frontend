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
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const GenreList = () => {
  const { data, isLoading, error } = useGeneres();
  const setGenre = useMovieQueryStore((s) => s.setGenre);
  const selectedGenreId = useMovieQueryStore((s) => s.movieQuery.genre?.id);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const genreId = searchParams.get("genre");
    if (genreId && data?.genres) {
      const genre = data.genres.find((g) => g.id === parseInt(genreId));
      if (genre) setGenre(genre);
    }
  }, [data]);

  const handleGenreClick = (genre: (typeof data.genres)[0]) => {
    if (genre.id === 1) {
      searchParams.delete("genre");
    } else {
      searchParams.set("genre", genre.id.toString());
    }
    setSearchParams(searchParams);
    setGenre(genre);
  };

  if (isLoading) return <Spinner role="progressbar" />;
  if (error) return <p>{error.message}</p>;

  return (
    <Box marginTop="10px" as="nav" aria-label="Genre List">
      <Heading fontSize="2xl">Genres</Heading>
      <List role="list">
        {data?.genres.map((genre) => (
          <ListItem key={genre.id} margin="3px" role="listitem">
            <Button
              fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
              onClick={() => handleGenreClick(genre)}
              variant="link"
              aria-pressed={genre.id === selectedGenreId}
              aria-label={`Filter by ${genre.name} genre`}
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
