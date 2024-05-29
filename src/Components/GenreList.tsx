import useGeneres from "../hooks/useGeneres";
import { Genre } from "../services/apiClient";
import {
  List,
  ListItem,
  Heading,
  Spinner,
  Button,
  Box,
} from "@chakra-ui/react";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data, isLoading, error } = useGeneres();

  if (isLoading) return <Spinner />;
  if (error) return null;
  return (
    <Box marginTop="10px">
      <Heading fontSize="2xl">Genres</Heading>
      <List>
        {data?.genres.map((genre) => (
          <ListItem key={genre.id} margin="3px">
            <Button
              fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
              onClick={() => {
                onSelectGenre(genre);
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
