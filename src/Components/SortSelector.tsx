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

export const SortSelector = () => {
  const sortOrders = [
    { value: "popularity", label: "Popularity" },
    { value: "vote_average.desc", label: "Rating" },
    { value: "primary_release_date.desc", label: "Release date" },
    { value: "title.asc", label: "Title" },
  ];
  const sortOrder = useMovieQueryStore((s) => s.movieQuery.sortOrder);
  const setSortOrder = useMovieQueryStore((s) => s.setSortOrder);

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );
  return (
    <Box padding={2}>
      <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronDown />}>
          Order by: {currentSortOrder?.label || "Popularity"}
        </MenuButton>
        <MenuList>
          {sortOrders.map((order) => (
            <MenuItem
              onClick={() => setSortOrder(order.value)}
              key={order.value}
              value={order.value}
            >
              {order.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
