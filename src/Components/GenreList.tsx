import useGeneres from "../hooks/useGeneres";
import { List, ListItem, Heading, Spinner } from "@chakra-ui/react";

const GenreList = () => {
  const { generes, isLoading } = useGeneres();
  return (
    <>
      <Heading>Genres</Heading>
      {isLoading && <Spinner />}
      <List>
        {generes.map((genre) => (
          <ListItem key={genre.id} margin="3px">
            {genre.name}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
