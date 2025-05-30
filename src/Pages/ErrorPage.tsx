import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../Components/NavBar";

const ErrorPage = () => {
  const routeError = useRouteError();
  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Heading>OOPS</Heading>
        <Text>
          {isRouteErrorResponse(routeError)
            ? "This page does not exist"
            : "unexpected error occured"}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;
