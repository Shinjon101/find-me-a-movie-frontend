import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  return (
    <>
      <InputGroup marginTop="10px">
        <InputLeftElement children={<BsSearch />} />
        <Input borderRadius={20} placeholder="Search movies..."></Input>
      </InputGroup>
    </>
  );
};

export default SearchInput;
