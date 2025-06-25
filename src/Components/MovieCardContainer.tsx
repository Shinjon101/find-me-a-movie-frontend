import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const MovieCardConatiner = ({ children }: Props) => {
  return <Box as="li">{children}</Box>;
};

export default MovieCardConatiner;
