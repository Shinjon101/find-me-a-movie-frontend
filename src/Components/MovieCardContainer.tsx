import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const MovieCardConatiner = ({ children }: Props) => {
  return (
    <Box
      borderRadius={10}
      overflow="hidden"
      tabIndex={0}
      _focusVisible={{ boxShadow: "outline" }}
    >
      {children}
    </Box>
  );
};

export default MovieCardConatiner;
