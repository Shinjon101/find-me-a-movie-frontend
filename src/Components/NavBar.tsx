import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/tv_8936507.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
const NavBar = () => {
  return (
    <>
      <HStack padding="5px 10px">
        <Image src={logo} boxSize="60px" marginRight="70px"></Image>
        <SearchInput />
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default NavBar;
