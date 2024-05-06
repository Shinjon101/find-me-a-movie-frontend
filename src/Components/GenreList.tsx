import useGeneres from "../hooks/useGeneres";
import { Text } from "@chakra-ui/react";

const GenreList = () => {
  const { generes, error, isLoading } = useGeneres();
  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {generes.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GenreList;
