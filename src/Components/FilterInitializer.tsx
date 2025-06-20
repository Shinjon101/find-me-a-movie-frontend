import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useMovieQueryStore from "../services/movieQueryStore";
import genres from "../data/genres";

const FilterInitializer = () => {
  const [searchParams] = useSearchParams();
  const setSortOrder = useMovieQueryStore((s) => s.setSortOrder);
  const setSearchText = useMovieQueryStore((s) => s.setSearchText);
  const setGenre = useMovieQueryStore((s) => s.setGenre);

  useEffect(() => {
    const sort = searchParams.get("sort");
    if (sort) setSortOrder(sort);

    const search = searchParams.get("search");
    if (search) setSearchText(search);

    const genreId = searchParams.get("genre");
    if (genreId) {
      const genre = genres.find((g) => g.id.toString() === genreId);
      if (genre) setGenre(genre);
    }
  }, []);

  return null;
};

export default FilterInitializer;
