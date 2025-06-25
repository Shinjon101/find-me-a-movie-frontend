import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <>
      <HStack as="section" aria-label="Color-scheme switcher">
        <Switch
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
          colorScheme="green"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        ></Switch>
        <Text cursor="pointer" onClick={toggleColorMode} whiteSpace="nowrap">
          Dark Mode
        </Text>
      </HStack>
    </>
  );
};

export default ColorModeSwitch;
