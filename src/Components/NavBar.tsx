import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/game_8853236.webp";
import ColorModeSwitch from "./ColorModeSwitch";
const NavBar = () => {
  return (
    <>
      <HStack justifyContent="space-between" padding="5px 10px">
        <Image src={logo} boxSize="60px"></Image>
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default NavBar;
