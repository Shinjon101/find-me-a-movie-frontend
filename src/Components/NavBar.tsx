import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/tv_8936507.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
interface Props {
  onSearch: (searchText: string) => void;
}
const NavBar = ({ onSearch }: Props) => {
  return (
    <>
      <HStack padding="5px 10px">
        <Image src={logo} boxSize="60px" marginRight="7px"></Image>
        <SearchInput onSearch={onSearch} />
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default NavBar;
