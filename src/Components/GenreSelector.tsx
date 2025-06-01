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

const GenreSelector = () => {
  const genre = useMovieQueryStore((s) => s.movieQuery.genre);
  const setGenre = useMovieQueryStore((s) => s.setGenre);

  const currenGenretOrder = genres.find((g) => g.id === genre?.id);
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
          Genre: {currenGenretOrder?.name || "All genres"}
        </MenuButton>
        <MenuList>
          {genres.map((g) => (
            <MenuItem key={g.id} value={g.name} onClick={() => setGenre(g)}>
              {g.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default GenreSelector;
