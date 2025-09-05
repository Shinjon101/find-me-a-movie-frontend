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
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const SortSelector = () => {
  const sortOrders = [
    { value: "popularity", label: "Popularity" },
    { value: "vote_average", label: "Rating" },
    { value: "release_date", label: "Release date" },
  ];

  const sortOrder = useMovieQueryStore((s) => s.movieQuery.sortOrder);
  const setSortOrder = useMovieQueryStore((s) => s.setSortOrder);
  const [searchParams, setSearchParams] = useSearchParams();

  //Read from URL and set store on first render
  useEffect(() => {
    const sort = searchParams.get("sort");
    if (sort) setSortOrder(sort);
  }, []);

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  const handleSelect = (value: string) => {
    searchParams.set("sort", value);

    setSortOrder(value);
    setSearchParams(searchParams);
  };

  return (
    <Box padding={2}>
      <Menu>
        <MenuButton
          as={Button}
          aria-label={`Sort movies. Current: ${sortOrder}`}
          whiteSpace="normal"
          wordBreak="break-word"
          fontSize={{ base: "sm", md: "md" }}
          rightIcon={<BsChevronDown />}
        >
          Order by: {currentSortOrder?.label || "Popularity"}
        </MenuButton>
        <MenuList aria-label="Sort movies by">
          {sortOrders.map((order) => (
            <MenuItem
              onClick={() => handleSelect(order.value)}
              key={order.value}
              value={order.value}
              fontWeight={order.value === sortOrder ? "bold" : "normal"} // emphasize
            >
              {order.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
