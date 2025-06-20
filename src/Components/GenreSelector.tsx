import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useMovieQueryStore from "../services/movieQueryStore";
import genres from "../data/genres";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const GenreSelector = () => {
  const genre = useMovieQueryStore((s) => s.movieQuery.genre);
  const setGenre = useMovieQueryStore((s) => s.setGenre);
  const [searchParams, setSearchParams] = useSearchParams();

  // Load genre from URL on first render
  useEffect(() => {
    const genreId = searchParams.get("genre");
    if (genreId) {
      const matchedGenre = genres.find((g) => g.id === parseInt(genreId));
      if (matchedGenre) setGenre(matchedGenre);
    }
  }, []);

  const handleGenreChange = (g: (typeof genres)[0]) => {
    if (g.id === 1) {
      // "All genres" option (id 1)
      searchParams.delete("genre");
    } else {
      searchParams.set("genre", g.id.toString());
    }
    setSearchParams(searchParams);
    setGenre(g);
  };

  const currentGenre = genres.find((g) => g.id === genre?.id);

  return (
    <Box padding={2}>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<BsChevronDown />}
          whiteSpace="normal"
          wordBreak="break-word"
          fontSize={{ base: "sm", md: "md" }}
        >
          Genre: {currentGenre?.name || "All genres"}
        </MenuButton>
        <MenuList>
          {genres.map((g) => (
            <MenuItem
              key={g.id}
              value={g.name}
              onClick={() => handleGenreChange(g)}
              bg={g.id === genre?.id ? "gray.100" : "transparent"}
              fontWeight={g.id === genre?.id ? "bold" : "normal"}
            >
              {g.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default GenreSelector;
