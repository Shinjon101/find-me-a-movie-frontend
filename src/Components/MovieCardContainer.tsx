import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const MovieCardConatiner = ({ children }: Props) => {
  return (
    <Box borderRadius={10} overflow="hidden" width="220px">
      {children}
    </Box>
  );
};

export default MovieCardConatiner;
