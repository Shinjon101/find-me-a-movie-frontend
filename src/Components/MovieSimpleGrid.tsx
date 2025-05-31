import { SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MovieSimpleGrid = ({ children }: Props) => {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
      spacing={8}
      padding={2}
    >
      {children}
    </SimpleGrid>
  );
};

export default MovieSimpleGrid;
