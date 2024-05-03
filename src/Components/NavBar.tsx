import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/game_8853236.webp";
const NavBar = () => {
  return (
    <>
      <HStack justifyContent="space-between" padding="5px 10px">
        <Image src={logo} boxSize="60px"></Image>
        <Text> NavBar or smth</Text>
      </HStack>
    </>
  );
};

export default NavBar;
