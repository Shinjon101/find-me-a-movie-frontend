import { Box } from "@chakra-ui/react";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";
import FilterInitializer from "../Components/FilterInitializer";

const Layout = () => {
  return (
    <>
      <FilterInitializer />
      <NavBar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
