import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import useMovieQueryStore from "../services/movieQueryStore";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useMovieQueryStore((s) => s.setSearchText);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search && ref.current) {
      ref.current.value = search;
    }
  }, []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          const searchValue = ref.current.value.trim(); //trim whitespace
          setSearchText(searchValue);

          if (searchValue === "") {
            searchParams.delete("search");
          } else {
            searchParams.set("search", searchValue); // set if not empty
          }

          setSearchParams(searchParams); //apply updated params
        }
      }}
    >
      <InputGroup marginTop="10px">
        <InputLeftElement children={<BsSearch />} />
        <Input ref={ref} borderRadius={20} placeholder="Search movies..." />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
