import useGeneres, { Genre } from "../hooks/useGeneres";
import { List, ListItem, Heading, Spinner, Button } from "@chakra-ui/react";

interface Props {
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ onSelectGenre }: Props) => {
  const { generes, isLoading } = useGeneres();
  return (
    <>
      <Heading>Genres</Heading>
      {isLoading && <Spinner />}
      <List>
        {generes.map((genre) => (
          <ListItem key={genre.id} margin="3px">
            <Button
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
    </>
  );
};

export default GenreList;
